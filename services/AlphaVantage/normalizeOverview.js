const TEXT_FIELDS = [
  'Symbol', 'AssetType', 'Name', 'Description', 'CIK', 'Exchange', 'Currency',
  'Country', 'Sector', 'Industry', 'Address', 'OfficialSite', 'FiscalYearEnd',
  'LatestQuarter'
]

const NUMERIC_FIELDS = [
  'MarketCapitalization', 'EBITDA', 'PERatio', 'PEGRatio', 'BookValue',
  'DividendPerShare', 'DividendYield', 'EPS', 'RevenuePerShareTTM',
  'ProfitMargin', 'OperatingMarginTTM', 'ReturnOnAssetsTTM', 'ReturnOnEquityTTM',
  'RevenueTTM', 'GrossProfitTTM', 'DilutedEPSTTM', 'QuarterlyEarningsGrowthYOY',
  'QuarterlyRevenueGrowthYOY', 'AnalystTargetPrice', 'TrailingPE', 'ForwardPE',
  'PriceToSalesRatioTTM', 'PriceToBookRatio', 'EVToRevenue', 'EVToEBITDA', 'Beta',
  'Week52High', 'Week52Low', 'Day50MovingAverage', 'Day200MovingAverage',
  'PercentInsiders', 'PercentInstitutions'
]

const INTEGER_FIELDS = [
  'AnalystRatingStrongBuy', 'AnalystRatingBuy', 'AnalystRatingHold',
  'AnalystRatingSell', 'AnalystRatingStrongSell', 'SharesOutstanding', 'SharesFloat'
]

const DATE_FIELDS = ['DividendDate', 'ExDividendDate']
const FIELD_NAMES = new Set([...TEXT_FIELDS, ...NUMERIC_FIELDS, ...INTEGER_FIELDS, ...DATE_FIELDS])

const API_FIELD_NAMES = {
  Week52High: '52WeekHigh',
  Week52Low: '52WeekLow',
  Day50MovingAverage: '50DayMovingAverage',
  Day200MovingAverage: '200DayMovingAverage'
}

const isMissing = (value) => value === undefined || value === null ||
  (typeof value === 'string' && ['', 'none', 'null', 'n/a', 'na', '-'].includes(value.trim().toLowerCase()))

const parseNumber = (value, integer = false) => {
  if (isMissing(value)) return null
  if (typeof value === 'number') return Number.isFinite(value) ? (integer ? Math.trunc(value) : value) : null

  const normalized = String(value).trim().replace(/[$,%\s,]/g, '')
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(normalized)) return null

  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? (integer ? Math.trunc(parsed) : parsed) : null
}

const parseDate = (value) => {
  if (isMissing(value)) return null
  const normalized = String(value).trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return null
  const date = new Date(`${normalized}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? null : normalized
}

const parseText = (value) => isMissing(value) ? null : String(value).trim()

export const OVERVIEW_COLUMNS = [
  ...FIELD_NAMES,
  '52WeekHigh', '52WeekLow', '50DayMovingAverage', '200DayMovingAverage'
]

export const normalizeOverview = (data, { requireSymbol = true } = {}) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid or empty Alpha Vantage response')
  }
  if (data.Note || data.Information || data['Error Message']) {
    throw new Error(data.Note || data.Information || data['Error Message'])
  }

  const normalized = {}
  for (const field of FIELD_NAMES) {
    const apiField = API_FIELD_NAMES[field] || field
    if (!Object.prototype.hasOwnProperty.call(data, apiField)) continue

    if (TEXT_FIELDS.includes(field)) normalized[field] = parseText(data[apiField])
    else if (NUMERIC_FIELDS.includes(field)) normalized[field] = parseNumber(data[apiField])
    else if (INTEGER_FIELDS.includes(field)) normalized[field] = parseNumber(data[apiField], true)
    else normalized[field] = parseDate(data[apiField])
  }

  for (const [field, apiField] of Object.entries(API_FIELD_NAMES)) {
    if (Object.prototype.hasOwnProperty.call(normalized, field)) normalized[apiField] = normalized[field]
  }

  if (requireSymbol && !normalized.Symbol) {
    throw new Error('Alpha Vantage response did not contain a Symbol')
  }
  return normalized
}

export const filterOverviewColumns = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Data must be a non-null object')
  }

  const filtered = {}
  for (const column of OVERVIEW_COLUMNS) {
    if (Object.prototype.hasOwnProperty.call(data, column)) filtered[column] = data[column]
  }
  if (Object.keys(filtered).length === 0) throw new Error('No recognized data columns were provided')
  return filtered
}

export const insertOverview = async (db, table, data) => {
  const filtered = filterOverviewColumns(data)
  const columns = Object.keys(filtered)
  const values = Object.values(filtered)
  const identifiers = columns.map((column) => `\`${column}\``).join(', ')
  const placeholders = columns.map(() => '?').join(', ')
  await db.execute(`INSERT INTO \`${table}\` (${identifiers}) VALUES (${placeholders})`, values)
}

export const updateOverview = async (db, table, id, data) => {
  const filtered = filterOverviewColumns(data)
  const columns = Object.keys(filtered)
  const values = Object.values(filtered)
  const assignments = columns.map((column) => `\`${column}\` = ?`).join(', ')
  await db.execute(`UPDATE \`${table}\` SET ${assignments} WHERE \`id\` = ?`, [...values, id])
}

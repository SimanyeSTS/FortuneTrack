import YahooFinancePkg from 'yahoo-finance2';
import { normalizeOverview } from './normalizeOverview.js';

const yahooFinance =
  typeof YahooFinancePkg === 'function'
    ? new YahooFinancePkg({ suppressNotices: ['yahooSurvey'] })
    : YahooFinancePkg;

const COUNTRY_MAP = {
  'United States': 'USA',
  'United Kingdom': 'UK',
  Netherlands: 'NLD',
  Switzerland: 'CHE',
  China: 'CHN',
  Brazil: 'BRA',
  Uruguay: 'URY',
  Argentina: 'ARG',
  Ireland: 'IRL'
};

const EXCHANGE_MAP = {
  NMS: 'NASDAQ',
  NGM: 'NASDAQ',
  NCM: 'NASDAQ',
  NasdaqGS: 'NASDAQ',
  NasdaqGM: 'NASDAQ',
  NasdaqCM: 'NASDAQ',
  NYQ: 'NYSE',
  NYSE: 'NYSE',
  PCX: 'NYSE',
  ASE: 'AMEX'
};

const toDateString = (val) => {
  if (!val) return null;
  const d = val instanceof Date ? val : new Date(val);
  return isNaN(d.getTime()) ? null : d.toISOString().split('T')[0];
};

const toFiscalMonth = (val) => {
  if (!val) return 'December';
  const d = val instanceof Date ? val : new Date(val);
  return isNaN(d.getTime())
    ? 'December'
    : d.toLocaleString('en-US', { month: 'long' });
};

const safeDec = (val, maxAbs = 99999999.99, decimals = 2) => {
  const num = Number(val);
  if (val === null || val === undefined || Number.isNaN(num) || !Number.isFinite(num)) {
    return 0;
  }
  const clamped = Math.max(-maxAbs, Math.min(maxAbs, num));
  return Number(clamped.toFixed(decimals));
};

const safeInt = (val) => {
  const num = Number(val);
  if (val === null || val === undefined || Number.isNaN(num) || !Number.isFinite(num)) {
    return 0;
  }
  return Math.round(num);
};

const safeStr = (val, maxLen, fallback = 'None') => {
  if (!val || typeof val !== 'string') return fallback;
  const trimmed = val.trim();
  return trimmed ? trimmed.slice(0, maxLen) : fallback;
};

export async function fetchYahooOverview(symbol) {
  const result = await yahooFinance.quoteSummary(
    symbol,
    {
      modules: [
        'price',
        'summaryProfile',
        'summaryDetail',
        'defaultKeyStatistics',
        'financialData',
        'recommendationTrend',
        'calendarEvents'
      ]
    },
    { validateResult: false }
  );

  if (!result || (!result.price && !result.summaryDetail)) {
    throw new Error(`No Yahoo Finance overview data returned for ${symbol}`);
  }

  const price = result.price || {};
  const profile = result.summaryProfile || {};
  const detail = result.summaryDetail || {};
  const stats = result.defaultKeyStatistics || {};
  const fin = result.financialData || {};
  const calendar = result.calendarEvents || {};
  const trend = result.recommendationTrend?.trend?.[0] || {};

  const rawCountry = profile.country || 'USA';
  const shortCountry = COUNTRY_MAP[rawCountry] || rawCountry.slice(0, 10);

  const rawExchange = price.exchange || price.exchangeName || 'NYSE';
  const shortExchange = EXCHANGE_MAP[rawExchange] || rawExchange.slice(0, 10);

  const addressParts = [
    profile.address1,
    profile.city,
    profile.state,
    profile.zip,
    profile.country
  ].filter(Boolean);

  const rawOverview = {
    Symbol: safeStr(price.symbol || symbol, 10, symbol),
    AssetType: price.quoteType === 'EQUITY' ? 'Common Stock' : safeStr(price.quoteType, 20, 'Common Stock'),
    Name: safeStr(price.longName || price.shortName || symbol, 100, symbol),
    Description: profile.longBusinessSummary || 'None',
    CIK: 'None',
    Exchange: safeStr(shortExchange, 10, 'NYSE'),
    Currency: safeStr(price.currency || fin.financialCurrency || 'USD', 3, 'USD'),
    Country: safeStr(shortCountry, 10, 'USA'),
    Sector: safeStr(profile.sector ? profile.sector.toUpperCase() : 'None', 20, 'None'),
    Industry: safeStr(profile.industry ? profile.industry.toUpperCase() : 'None', 100, 'None'),
    Address: addressParts.length > 0 ? addressParts.join(', ').slice(0, 255) : 'None',
    OfficialSite: safeStr(profile.website, 255, 'None'),
    FiscalYearEnd: toFiscalMonth(stats.lastFiscalYearEnd),
    LatestQuarter: toDateString(stats.mostRecentQuarter),
    MarketCapitalization: safeInt(price.marketCap ?? detail.marketCap),
    EBITDA: safeInt(fin.ebitda),
    PERatio: safeDec(detail.trailingPE, 99999999.99),
    PEGRatio: safeDec(stats.pegRatio, 99999999.99),
    BookValue: safeDec(stats.bookValue, 99999999.99),
    DividendPerShare: safeDec(detail.dividendRate, 99999999.99),
    DividendYield: safeDec(detail.dividendYield, 999.99, 4),
    EPS: safeDec(stats.trailingEps, 99999999.99),
    RevenuePerShareTTM: safeDec(fin.revenuePerShare, 99999999.99),
    ProfitMargin: safeDec(stats.profitMargins ?? fin.profitMargins, 999.99, 4),
    OperatingMarginTTM: safeDec(fin.operatingMargins, 999.99, 4),
    ReturnOnAssetsTTM: safeDec(fin.returnOnAssets, 999.99, 4),
    ReturnOnEquityTTM: safeDec(fin.returnOnEquity, 999.99, 4),
    RevenueTTM: safeInt(fin.totalRevenue),
    GrossProfitTTM: safeInt(fin.grossProfits),
    DilutedEPSTTM: safeDec(stats.trailingEps, 99999999.99),
    QuarterlyEarningsGrowthYOY: safeDec(stats.earningsQuarterlyGrowth ?? fin.earningsGrowth, 999.99, 4),
    QuarterlyRevenueGrowthYOY: safeDec(fin.revenueGrowth, 999.99, 4),
    AnalystTargetPrice: safeDec(fin.targetMeanPrice, 99999999.99),
    AnalystRatingStrongBuy: safeInt(trend.strongBuy),
    AnalystRatingBuy: safeInt(trend.buy),
    AnalystRatingHold: safeInt(trend.hold),
    AnalystRatingSell: safeInt(trend.sell),
    AnalystRatingStrongSell: safeInt(trend.strongSell),
    TrailingPE: safeDec(detail.trailingPE, 99999999.99),
    ForwardPE: safeDec(detail.forwardPE ?? stats.forwardPE, 99999999.99),
    PriceToSalesRatioTTM: safeDec(detail.priceToSalesTrailing12Months, 999.99),
    PriceToBookRatio: safeDec(stats.priceToBook, 999.99),
    EVToRevenue: safeDec(stats.enterpriseToRevenue, 999.99),
    EVToEBITDA: safeDec(stats.enterpriseToEbitda, 999.99),
    Beta: safeDec(detail.beta ?? stats.beta, 999.99),
    '52WeekHigh': safeDec(detail.fiftyTwoWeekHigh, 99999999.99),
    '52WeekLow': safeDec(detail.fiftyTwoWeekLow, 99999999.99),
    '50DayMovingAverage': safeDec(detail.fiftyDayAverage, 99999999.99),
    '200DayMovingAverage': safeDec(detail.twoHundredDayAverage, 99999999.99),
    SharesOutstanding: safeInt(stats.sharesOutstanding),
    SharesFloat: safeInt(stats.floatShares),
    PercentInsiders: safeDec(stats.heldPercentInsiders, 999.99, 4),
    PercentInstitutions: safeDec(stats.heldPercentInstitutions, 999.99, 4),
    DividendDate: toDateString(calendar.dividendDate ?? detail.dividendDate),
    ExDividendDate: toDateString(detail.exDividendDate ?? calendar.exDividendDate)
  };

  return normalizeOverview(rawOverview);
}

export default fetchYahooOverview;
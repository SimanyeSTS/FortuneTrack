import Technology from '../model/Technology.js'
import axios from 'axios'

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'R4015USIUYJ56RBE'
const apikey2 = 'CD9K8NRWJVO13Q70'
const apikey3 = 'OD7O17P71U67DRKT'
const baseUrl = 'https://www.alphavantage.co/query'

const safeParseFloat = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
}

const safeParseInt = (value) => {
  if (value === undefined || value === null || value === '') {
    return null;
  }
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
}

const handleApiError = (data) => {
  if (data.Note || data.Information) {
    throw new Error('API limit or error message received');
  }
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid or empty response from API');
  }
}

const getTechnologyData = async (req, res) => {
  try {
    const symbol = 'INTC'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
    const response = await axios.get(url)
    const data = response.data

    const technologyData = {
      Symbol: data.Symbol,
      AssetType: data.AssetType,
      Name: data.Name,
      Description: data.Description,
      CIK: data.CIK,
      Exchange: data.Exchange,
      Currency: data.Currency,
      Country: data.Country,
      Sector: data.Sector,
      Industry: data.Industry,
      Address: data.Address,
      OfficialSite: data.OfficialSite,
      FiscalYearEnd: data.FiscalYearEnd,
      LatestQuarter: data.LatestQuarter,
      MarketCapitalization: safeParseFloat(data.MarketCapitalization),
      EBITDA: safeParseFloat(data.EBITDA),
      PERatio: safeParseFloat(data.PERatio),
      PEGRatio: safeParseFloat(data.PEGRatio),
      BookValue: safeParseFloat(data.BookValue),
      DividendPerShare: safeParseFloat(data.DividendPerShare),
      DividendYield: safeParseFloat(data.DividendYield),
      EPS: safeParseFloat(data.EPS),
      RevenuePerShareTTM: safeParseFloat(data.RevenuePerShareTTM),
      ProfitMargin: safeParseFloat(data.ProfitMargin),
      OperatingMarginTTM: safeParseFloat(data.OperatingMarginTTM),
      ReturnOnAssetsTTM: safeParseFloat(data.ReturnOnAssetsTTM),
      ReturnOnEquityTTM: safeParseFloat(data.ReturnOnEquityTTM),
      RevenueTTM: safeParseFloat(data.RevenueTTM),
      GrossProfitTTM: safeParseFloat(data.GrossProfitTTM),
      DilutedEPSTTM: safeParseFloat(data.DilutedEPSTTM),
      QuarterlyEarningsGrowthYOY: safeParseFloat(data.QuarterlyEarningsGrowthYOY),
      QuarterlyRevenueGrowthYOY: safeParseFloat(data.QuarterlyRevenueGrowthYOY),
      AnalystTargetPrice: safeParseFloat(data.AnalystTargetPrice),
      AnalystRatingStrongBuy: safeParseInt(data.AnalystRatingStrongBuy),
      AnalystRatingBuy: safeParseInt(data.AnalystRatingBuy),
      AnalystRatingHold: safeParseInt(data.AnalystRatingHold),
      AnalystRatingSell: safeParseInt(data.AnalystRatingSell),
      AnalystRatingStrongSell: safeParseInt(data.AnalystRatingStrongSell),
      TrailingPE: safeParseFloat(data.TrailingPE),
      ForwardPE: safeParseFloat(data.ForwardPE),
      PriceToSalesRatioTTM: safeParseFloat(data.PriceToSalesRatioTTM),
      PriceToBookRatio: safeParseFloat(data.PriceToBookRatio),
      EVToRevenue: safeParseFloat(data.EVToRevenue),
      EVToEBITDA: safeParseFloat(data.EVToEBITDA),
      Beta: safeParseFloat(data.Beta),
      Week52High: safeParseFloat(data['52WeekHigh']),
      Week52Low: safeParseFloat(data['52WeekLow']),
      Day50MovingAverage: safeParseFloat(data['50DayMovingAverage']),
      Day200MovingAverage: safeParseFloat(data['200DayMovingAverage']),
      SharesOutstanding: safeParseInt(data.SharesOutstanding),
      SharesFloat: safeParseInt(data.SharesFloat),
      PercentInsiders: safeParseFloat(data.PercentInsiders),
      PercentInstitutions: safeParseFloat(data.PercentInstitutions),
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null,
    }

    await Technology.saveTechnologyData(technologyData)
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getTechnologyData2 = async (req, res) => {
  try {
    const symbol = 'ASML'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey2}`
    const response = await axios.get(url)
    const data = response.data

    const technologyData2 = {
      Symbol: data.Symbol,
      AssetType: data.AssetType,
      Name: data.Name,
      Description: data.Description,
      CIK: data.CIK,
      Exchange: data.Exchange,
      Currency: data.Currency,
      Country: data.Country,
      Sector: data.Sector,
      Industry: data.Industry,
      Address: data.Address,
      OfficialSite: data.OfficialSite,
      FiscalYearEnd: data.FiscalYearEnd,
      LatestQuarter: data.LatestQuarter,
      MarketCapitalization: safeParseFloat(data.MarketCapitalization),
      EBITDA: safeParseFloat(data.EBITDA),
      PERatio: safeParseFloat(data.PERatio),
      PEGRatio: safeParseFloat(data.PEGRatio),
      BookValue: safeParseFloat(data.BookValue),
      DividendPerShare: safeParseFloat(data.DividendPerShare),
      DividendYield: safeParseFloat(data.DividendYield),
      EPS: safeParseFloat(data.EPS),
      RevenuePerShareTTM: safeParseFloat(data.RevenuePerShareTTM),
      ProfitMargin: safeParseFloat(data.ProfitMargin),
      OperatingMarginTTM: safeParseFloat(data.OperatingMarginTTM),
      ReturnOnAssetsTTM: safeParseFloat(data.ReturnOnAssetsTTM),
      ReturnOnEquityTTM: safeParseFloat(data.ReturnOnEquityTTM),
      RevenueTTM: safeParseFloat(data.RevenueTTM),
      GrossProfitTTM: safeParseFloat(data.GrossProfitTTM),
      DilutedEPSTTM: safeParseFloat(data.DilutedEPSTTM),
      QuarterlyEarningsGrowthYOY: safeParseFloat(data.QuarterlyEarningsGrowthYOY),
      QuarterlyRevenueGrowthYOY: safeParseFloat(data.QuarterlyRevenueGrowthYOY),
      AnalystTargetPrice: safeParseFloat(data.AnalystTargetPrice),
      AnalystRatingStrongBuy: safeParseInt(data.AnalystRatingStrongBuy),
      AnalystRatingBuy: safeParseInt(data.AnalystRatingBuy),
      AnalystRatingHold: safeParseInt(data.AnalystRatingHold),
      AnalystRatingSell: safeParseInt(data.AnalystRatingSell),
      AnalystRatingStrongSell: safeParseInt(data.AnalystRatingStrongSell),
      TrailingPE: safeParseFloat(data.TrailingPE),
      ForwardPE: safeParseFloat(data.ForwardPE),
      PriceToSalesRatioTTM: safeParseFloat(data.PriceToSalesRatioTTM),
      PriceToBookRatio: safeParseFloat(data.PriceToBookRatio),
      EVToRevenue: safeParseFloat(data.EVToRevenue),
      EVToEBITDA: safeParseFloat(data.EVToEBITDA),
      Beta: safeParseFloat(data.Beta),
      Week52High: safeParseFloat(data['52WeekHigh']),
      Week52Low: safeParseFloat(data['52WeekLow']),
      Day50MovingAverage: safeParseFloat(data['50DayMovingAverage']),
      Day200MovingAverage: safeParseFloat(data['200DayMovingAverage']),
      SharesOutstanding: safeParseInt(data.SharesOutstanding),
      SharesFloat: safeParseInt(data.SharesFloat),
      PercentInsiders: safeParseFloat(data.PercentInsiders),
      PercentInstitutions: safeParseFloat(data.PercentInstitutions),
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null,
    }

    await Technology.saveTechnologyData(technologyData2)
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getTechnologyData3 = async (req, res) => {
  try {
    const symbol = 'MELI'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey3}`
    const response = await axios.get(url)
    const data = response.data

    const technologyData3 = {
      Symbol: data.Symbol,
      AssetType: data.AssetType,
      Name: data.Name,
      Description: data.Description,
      CIK: data.CIK,
      Exchange: data.Exchange,
      Currency: data.Currency,
      Country: data.Country,
      Sector: data.Sector,
      Industry: data.Industry,
      Address: data.Address,
      OfficialSite: data.OfficialSite,
      FiscalYearEnd: data.FiscalYearEnd,
      LatestQuarter: data.LatestQuarter,
      MarketCapitalization: safeParseFloat(data.MarketCapitalization),
      EBITDA: safeParseFloat(data.EBITDA),
      PERatio: safeParseFloat(data.PERatio),
      PEGRatio: safeParseFloat(data.PEGRatio),
      BookValue: safeParseFloat(data.BookValue),
      DividendPerShare: safeParseFloat(data.DividendPerShare),
      DividendYield: safeParseFloat(data.DividendYield),
      EPS: safeParseFloat(data.EPS),
      RevenuePerShareTTM: safeParseFloat(data.RevenuePerShareTTM),
      ProfitMargin: safeParseFloat(data.ProfitMargin),
      OperatingMarginTTM: safeParseFloat(data.OperatingMarginTTM),
      ReturnOnAssetsTTM: safeParseFloat(data.ReturnOnAssetsTTM),
      ReturnOnEquityTTM: safeParseFloat(data.ReturnOnEquityTTM),
      RevenueTTM: safeParseFloat(data.RevenueTTM),
      GrossProfitTTM: safeParseFloat(data.GrossProfitTTM),
      DilutedEPSTTM: safeParseFloat(data.DilutedEPSTTM),
      QuarterlyEarningsGrowthYOY: safeParseFloat(data.QuarterlyEarningsGrowthYOY),
      QuarterlyRevenueGrowthYOY: safeParseFloat(data.QuarterlyRevenueGrowthYOY),
      AnalystTargetPrice: safeParseFloat(data.AnalystTargetPrice),
      AnalystRatingStrongBuy: safeParseInt(data.AnalystRatingStrongBuy),
      AnalystRatingBuy: safeParseInt(data.AnalystRatingBuy),
      AnalystRatingHold: safeParseInt(data.AnalystRatingHold),
      AnalystRatingSell: safeParseInt(data.AnalystRatingSell),
      AnalystRatingStrongSell: safeParseInt(data.AnalystRatingStrongSell),
      TrailingPE: safeParseFloat(data.TrailingPE),
      ForwardPE: safeParseFloat(data.ForwardPE),
      PriceToSalesRatioTTM: safeParseFloat(data.PriceToSalesRatioTTM),
      PriceToBookRatio: safeParseFloat(data.PriceToBookRatio),
      EVToRevenue: safeParseFloat(data.EVToRevenue),
      EVToEBITDA: safeParseFloat(data.EVToEBITDA),
      Beta: safeParseFloat(data.Beta),
      Week52High: safeParseFloat(data['52WeekHigh']),
      Week52Low: safeParseFloat(data['52WeekLow']),
      Day50MovingAverage: safeParseFloat(data['50DayMovingAverage']),
      Day200MovingAverage: safeParseFloat(data['200DayMovingAverage']),
      SharesOutstanding: safeParseInt(data.SharesOutstanding),
      SharesFloat: safeParseInt(data.SharesFloat),
      PercentInsiders: safeParseFloat(data.PercentInsiders),
      PercentInstitutions: safeParseFloat(data.PercentInstitutions),
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null,
    }

    await Technology.saveTechnologyData(technologyData3)
    
    res.json(data)
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
}

const getTechnologyDataById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Technology.getTechnologyDataById(id)

    if (!data) {
      res.status(404).json({ message: 'Technology data not found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllTechnologyData = async (req, res) => {
  try {
    const data = await Technology.getAllTechnologyData()
    
    if (!data.length) {
      res.status(404).json({ message: 'No technology data found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const patchTechnologyData = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
      
    await Technology.patchTechnologyData(id, data)
    res.json({ message: 'Technology data updated successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteTechnologyData = async (req, res) => {
  try {
    const id = req.params.id

    await Technology.deleteTechnologyData(id)
    res.json({ message: 'Technology data deleted successfully'})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addTechnologyData = async (req, res) => {
  try {
    const data = req.body

    await Technology.addTechnologyData(data)
    res.json({ message: 'Technology data added successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default{ 
  getTechnologyData,
  getTechnologyData2,
  getTechnologyData3,
  getTechnologyDataById,
  getAllTechnologyData,
  patchTechnologyData,
  deleteTechnologyData,
  addTechnologyData
}
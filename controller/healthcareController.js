import axios from 'axios'
import Healthcare from '../model/Healthcare.js'
import { normalizeOverview } from '../services/AlphaVantage/normalizeOverview.js'

//Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'PIJIS96UCXDW58KF'
const apikey2 = '67DAX9WMDSD7ISLF'
const apikey3 = 'JHJT0T1Q8BFTMHTX'
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

const getHealthcareData = async (req, res) => {
  try {
    const symbol = 'JNJ'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
    const response = await axios.get(url)
    const data = normalizeOverview(response.data)

    const healthcareData = {
      Symbol: data.Symbol,
      AssetType: data.AssetType || null,
      Name: data.Name || null,
      Description: data.Description || null,
      CIK: data.CIK || null,
      Exchange: data.Exchange || null,
      Currency: data.Currency || null,
      Country: data.Country || null,
      Sector: data.Sector || null,
      Industry: data.Industry || null,
      Address: data.Address || null,
      OfficialSite: data.OfficialSite || null,
      FiscalYearEnd: data.FiscalYearEnd || null,
      LatestQuarter: data.LatestQuarter || null,
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
      '52WeekHigh': safeParseFloat(data['52WeekHigh']),
      '52WeekLow': safeParseFloat(data['52WeekLow']),
      '50DayMovingAverage': safeParseFloat(data['50DayMovingAverage']),
      '200DayMovingAverage': safeParseFloat(data['200DayMovingAverage']),
      SharesOutstanding: safeParseInt(data.SharesOutstanding),
      SharesFloat: safeParseInt(data.SharesFloat),
      PercentInsiders: safeParseFloat(data.PercentInsiders),
      PercentInstitutions: safeParseFloat(data.PercentInstitutions),
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null
    }

    await Healthcare.saveHealthcareData(healthcareData)

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getHealthcareData2 = async (req, res) => {
  try {
    const symbol = 'NVS'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey2}`
    const response = await axios.get(url)
    const data = normalizeOverview(response.data)

    handleApiError(data);

    const healthcareData2 = {
      Symbol: data.Symbol,
      AssetType: data.AssetType || null,
      Name: data.Name || null,
      Description: data.Description || null,
      CIK: data.CIK || null,
      Exchange: data.Exchange || null,
      Currency: data.Currency || null,
      Country: data.Country || null,
      Sector: data.Sector || null,
      Industry: data.Industry || null,
      Address: data.Address || null,
      OfficialSite: data.OfficialSite || null,
      FiscalYearEnd: data.FiscalYearEnd || null,
      LatestQuarter: data.LatestQuarter || null,
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
      '52WeekHigh': safeParseFloat(data['52WeekHigh']),
      '52WeekLow': safeParseFloat(data['52WeekLow']),
      '50DayMovingAverage': safeParseFloat(data['50DayMovingAverage']),
      '200DayMovingAverage': safeParseFloat(data['200DayMovingAverage']),
      SharesOutstanding: safeParseInt(data.SharesOutstanding),
      SharesFloat: safeParseInt(data.SharesFloat),
      PercentInsiders: safeParseFloat(data.PercentInsiders),
      PercentInstitutions: safeParseFloat(data.PercentInstitutions),
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null
    }

    if (!healthcareData2.Symbol) {
      throw new Error('Symbol is required but was not provided in the API response');
    }

    await Healthcare.saveHealthcareData(healthcareData2)

    res.json(data)
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}

const getHealthcareData3 = async (req, res) => {
  try {
    const symbol = 'AZN'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey2}`
    const response = await axios.get(url)
    const data = normalizeOverview(response.data)

    handleApiError(data);

    const healthcareData3 = {
      Symbol: data.Symbol,
      AssetType: data.AssetType || null,
      Name: data.Name || null,
      Description: data.Description || null,
      CIK: data.CIK || null,
      Exchange: data.Exchange || null,
      Currency: data.Currency || null,
      Country: data.Country || null,
      Sector: data.Sector || null,
      Industry: data.Industry || null,
      Address: data.Address || null,
      OfficialSite: data.OfficialSite || null,
      FiscalYearEnd: data.FiscalYearEnd || null,
      LatestQuarter: data.LatestQuarter || null,
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
      '52WeekHigh': safeParseFloat(data['52WeekHigh']),
      '52WeekLow': safeParseFloat(data['52WeekLow']),
      '50DayMovingAverage': safeParseFloat(data['50DayMovingAverage']),
      '200DayMovingAverage': safeParseFloat(data['200DayMovingAverage']),
      SharesOutstanding: safeParseInt(data.SharesOutstanding),
      SharesFloat: safeParseInt(data.SharesFloat),
      PercentInsiders: safeParseFloat(data.PercentInsiders),
      PercentInstitutions: safeParseFloat(data.PercentInstitutions),
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null
    }

    if (!healthcareData3.Symbol) {
      throw new Error('Symbol is required but was not provided in the API response');
    }

    await Healthcare.saveHealthcareData(healthcareData3)

    res.json(data)
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}

const getHealthcareDataById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Healthcare.getHealthcareDataById(id)

    if (!data) {
      res.status(404).json({ message: 'Healthcare data not found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllHealthcareData = async (req, res) => {
  try {
    const data = await Healthcare.getAllHealthcareData()
    
    if (!data.length) {
      res.status(404).json({ message: 'No healthcare data found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const patchHealthcareData = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    await Healthcare.patchHealthcareData(id, data)
    res.json({ message: 'Healthcare data updated successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteHealthcareData = async (req, res) => {
  try {
    const id = req.params.id

    await Healthcare.deleteHealthcareData(id)
    res.json({ message: 'Healthcare data deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addHealthcareData = async (req, res) => {
  try {
    const data = req.body

    await Healthcare.addHealthcareData(data)
    res.json({message: 'Healthcare data added successfully'})
  } catch (error) {
    res.status(500).json({message: error.message })
  }
}

export default{
  getHealthcareData,
  getHealthcareData2,
  getHealthcareData3,
  getHealthcareDataById,
  getAllHealthcareData,
  patchHealthcareData,
  deleteHealthcareData,
  addHealthcareData
}
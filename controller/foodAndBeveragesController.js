import axios from 'axios'
import FoodAndBeverages from '../model/FoodAndBeverages.js'

// Note- Free API Keys anybody can get on AlphaVantage in 30 seconds, zero need to hide them (I am aware of security and .env/gitignore)
const apikey = 'K9HED7RC8QLPJTT0'
const apikey2 = 'W7VKF4FSAGSTIUY2'
const apikey3 = 'I7FZD4K4SRHYLEL8'
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

const getFoodAndBeveragesData = async (req, res) => {
  try {
    const symbol = 'MCD'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
    const response = await axios.get(url)
    const data = response.data

    handleApiError(data);

    const foodAndBeveragesData = {
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
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null,
    }

    await FoodAndBeverages.saveFoodAndBeveragesData(foodAndBeveragesData)
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getFoodAndBeveragesData2 = async (req, res) => {
  try {
    const symbol = 'ABEV'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey2}`
    const response = await axios.get(url)
    const data = response.data

    handleApiError(data);

    const foodAndBeveragesData2 = {
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
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null
    }

    if (!foodAndBeveragesData2.Symbol) {
      throw new Error('Symbol is required but was not provided in the API response');
    }

    await FoodAndBeverages.saveFoodAndBeveragesData(foodAndBeveragesData2)
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}

const getFoodAndBeveragesData3 = async (req, res) => {
  try {
    const symbol = 'DEO'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey3}`
    const response = await axios.get(url)
    const data = response.data

    handleApiError(data);

    const foodAndBeveragesData3 = {
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
      DividendDate: data.DividendDate || null,
      ExDividendDate: data.ExDividendDate || null
    }

    if (!foodAndBeveragesData3.Symbol) {
      throw new Error('Symbol is required but was not provided in the API response');
    }

    await FoodAndBeverages.saveFoodAndBeveragesData(foodAndBeveragesData3)
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
}

const getFoodAndBeveragesDataById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await FoodAndBeverages.getFoodAndBeveragesDataById(id)

    if (!data) {
      res.status(404).json({ message: 'Food and beverages data not found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllFoodAndBeveragesData = async (req, res) => {
  try {
    const data = await FoodAndBeverages.getAllFoodAndBeveragesData()
    
    if (!data.length) {
      res .status(404).json({ message: 'No food/beverages data found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const patchFoodAndBeveragesData = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    await FoodAndBeverages.patchFoodAndBeveragesData(id, data)
    res.json({ message: 'Food/Beverage data updated successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteFoodAndBeveragesData = async (req, res) => {
  try {
    const id = req.params.id

    await FoodAndBeverages.deleteFoodAndBeveragesData(id)
    res.json({ message: 'Food/Beverage data deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addFoodAndBeveragesData = async (req, res) => {
  try {
    const data = req.body

    await FoodAndBeverages.addFoodAndBeveragesData(data)
    res.json({ message: 'Food/Beverage data added successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default { 
  getFoodAndBeveragesData,
  getFoodAndBeveragesData2,
  getFoodAndBeveragesData3,
  getFoodAndBeveragesDataById,
  getAllFoodAndBeveragesData,
  patchFoodAndBeveragesData,
  deleteFoodAndBeveragesData,
  addFoodAndBeveragesData
}
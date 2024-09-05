import axios from 'axios'
import FoodAndBeverages from '../model/FoodAndBeverages.js'

const apikey = 'K9HED7RC8QLPJTT0'
const baseUrl = 'https://www.alphavantage.co/query'

const getFoodAndBeveragesData = async (req, res) => {
  try {
    const symbol = 'MCD'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
    const response = await axios.get(url)
    const data = response.data


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
      MarketCapitalization: parseFloat(data.MarketCapitalization),
      EBITDA: parseFloat(data.EBITDA),
      PERatio: parseFloat(data.PERatio),
      PEGRatio: parseFloat(data.PEGRatio),
      BookValue: parseFloat(data.BookValue),
      DividendPerShare: parseFloat(data.DividendPerShare),
      DividendYield: parseFloat(data.DividendYield),
      EPS: parseFloat(data.EPS),
      RevenuePerShareTTM: parseFloat(data.RevenuePerShareTTM),
      ProfitMargin: parseFloat(data.ProfitMargin),
      OperatingMarginTTM: parseFloat(data.OperatingMarginTTM),
      ReturnOnAssetsTTM: parseFloat(data.ReturnOnAssetsTTM),
      ReturnOnEquityTTM: parseFloat(data.ReturnOnEquityTTM),
      RevenueTTM: parseFloat(data.RevenueTTM),
      GrossProfitTTM: parseFloat(data.GrossProfitTTM),
      DilutedEPSTTM: parseFloat(data.DilutedEPSTTM),
      QuarterlyEarningsGrowthYOY: parseFloat(data.QuarterlyEarningsGrowthYOY),
      QuarterlyRevenueGrowthYOY: parseFloat(data.QuarterlyRevenueGrowthYOY),
      AnalystTargetPrice: parseFloat(data.AnalystTargetPrice),
      AnalystRatingStrongBuy: parseInt(data.AnalystRatingStrongBuy),
      AnalystRatingBuy: parseInt(data.AnalystRatingBuy),
      AnalystRatingHold: parseInt(data.AnalystRatingHold),
      AnalystRatingSell: parseInt(data.AnalystRatingSell),
      AnalystRatingStrongSell: parseInt(data.AnalystRatingStrongSell),
      TrailingPE: parseFloat(data.TrailingPE),
      ForwardPE: parseFloat(data.ForwardPE),
      PriceToSalesRatioTTM: parseFloat(data.PriceToSalesRatioTTM),
      PriceToBookRatio: parseFloat(data.PriceToBookRatio),
      EVToRevenue: parseFloat(data.EVToRevenue),
      EVToEBITDA: parseFloat(data.EVToEBITDA),
      Beta: parseFloat(data.Beta),
      Week52High: parseFloat(data['52WeekHigh']),
      Week52Low: parseFloat(data['52WeekLow']),
      Day50MovingAverage: parseFloat(data['50DayMovingAverage']),
      Day200MovingAverage: parseFloat(data['200DayMovingAverage']),
      SharesOutstanding: parseInt(data.SharesOutstanding),
      DividendDate: data.DividendDate,
      ExDividendDate: data.ExDividendDate,
    }

    await FoodAndBeverages.saveFoodAndBeveragesData(foodAndBeveragesData)
    
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food and beverages data' })
  }
}

const patchFoodAndBeveragesData = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    await FoodAndBeverages.patchFoodAndBeveragesData(id, data)
    res.json({ message: 'Food/Beverage data updated successfully'})
  } catch (error) {
    res.status(500).json({ message: 'Error updating Food/Beverage data'})
  }
}

const deleteFoodAndBeveragesData = async (req, res) => {
  try {
    const id = req.params.id

    await FoodAndBeverages.deleteFoodAndBeveragesData(id)
    res.json({ message: 'Food/Beverage data deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Food/Beverage data' })
  }
}

export default { 
  getFoodAndBeveragesData,
  patchFoodAndBeveragesData,
  deleteFoodAndBeveragesData
}
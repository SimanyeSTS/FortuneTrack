import axios from 'axios'
import Retail from '../model/Retail.js'

const apikey = 'UZKLRJ8NRMMH51PQ'
const baseUrl = 'https://www.alphavantage.co/query'

const getRetailData = async (req, res) => {
  try {
    const symbol = 'COST'
    const url = `${baseUrl}?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`
    const response = await axios.get(url)
    const data = response.data

    const retailData = {
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

    await Retail.saveRetailData(retailData)

    res.json(data)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching retail data' })
  }
}

const getRetailDataById = async (req, res) => {
  try {
    const id = req.params.id
    const data = await Retail.getRetailDataById(id)

    if (!data) {
      res.status(404).json({ message: 'Retail data not found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching retail data' })
  }
}

const getRetailDataBySymbol = async (req, res) => {
  try {
    const symbol = req.params.symbol
    const data = await Retail.getRetailDataBySymbol(symbol)

    if (!data) {
      res.status(404).json({ message: 'Retail data not found for the given symbol' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching retail data by symbol' })
  }
}

const getAllRetailData = async (req, res) => {
  try {
    const data = await Retail.getAllRetailData()
    
    if (!data.length) {
      res.status(404).json({ message: 'No retail data found' })
    } else {
      res.json(data)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const patchRetailData = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    await Retail.patchRetailData(id, data)
    res.json({ message: 'Retail data updated successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteRetailData = async (req, res) => {
  try {
    const id = req.params.id

    await Retail.deleteRetailData(id)
    res.json({ message: 'Retail data deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const addRetailData = async (req, res) => {
  try {
    const data = req.body

    await Retail.addRetailData(data)
    res.json({ message: 'Retail data added successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export default {
  getRetailData,
  getRetailDataById,
  getAllRetailData,
  patchRetailData,
  deleteRetailData,
  addRetailData,
  getRetailDataBySymbol
}
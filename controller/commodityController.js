import express from 'express'
import { Prediction } from '../model/Predictions.js'
import commodityService from '../services/AlphaVantage/commodityService.js'

const commodityRouter = express.Router()

commodityRouter.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll('commodity')
    res.json({
      status: 200,
      results: predictions,
      message: predictions.length === 0 ? 'No commodity predictions found' : ''
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching commodity predictions' })
  }
})

commodityRouter.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol
    const prediction = await commodityService.fetchCommodityData(symbol)
    res.json({
      status: 200,
      results: prediction,
      message: prediction ? '' : `Commodity data not found for symbol ${req.params.symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Commodity data not found for symbol ${req.params.symbol}` })
  }
})

commodityRouter.post('/fetch', async (req, res) => {
  try {
    const symbol = req.body.symbol
    await commodityService.fetchCommodityData(symbol)
    res.json({
      status: 200,
      message: `Data fetched for ${symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: `Error fetching commodity data for symbol ${req.body.symbol}` })
  }
})

export {
  commodityRouter
}
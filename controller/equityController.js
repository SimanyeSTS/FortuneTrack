import express from 'express';
import { Prediction } from '../model/Predictions.js';
import equityService from '../services/AlphaVantage/equityService.js';

const equityRouter = express.Router()

equityRouter.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll('equity')
    res.json({
      status: 200,
      results: predictions,
      message: predictions.length === 0 ? 'No equity predictions found' : ''
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching equity predictions' })
  }
})

equityRouter.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const prediction = await equityService.fetchEquityData(symbol)
    res.json({
      status: 200,
      results: prediction,
      message: prediction ? '' : `Equity data not found for symbol ${req.params.symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Equity data not found for symbol ${req.params.symbol}` })
  }
})

equityRouter.post('/fetch', async (req, res) => {
  try {
    const symbol = req.body.symbol;
    await equityService.fetchEquityData(symbol)
    res.json({
      status: 200,
      message: `Data fetched for ${symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: `Error fetching equity data for symbol ${req.body.symbol}` })
  }
})

export {
  equityRouter
}
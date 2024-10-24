import express from 'express';
import { Prediction } from '../model/Predictions.js';
import forexService from '../services/AlphaVantage/forexService.js';

const forexRouter = express.Router()

forexRouter.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll('forex')
    res.json({
      status: 200,
      results: predictions,
      message: predictions.length === 0 ? 'No forex predictions found' : ''
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching forex predictions' })
  }
})

forexRouter.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol
    const prediction = await forexService.fetchForexData(symbol)
    res.json({
      status: 200,
      results: prediction,
      message: prediction ? '' : `Forex data not found for symbol ${req.params.symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Forex data not found for symbol ${req.params.symbol}` })
  }
})

forexRouter.post('/fetch', async (req, res) => {
  try {
    const symbol = req.body.symbol;
    await forexService.fetchForexData(symbol)
    res.json({
      status: 200,
      message: `Data fetched for ${symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: `Error fetching forex data for symbol ${req.body.symbol}` })
  }
})

export {
  forexRouter
}
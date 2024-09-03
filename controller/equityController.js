import express from 'express';
import { Prediction } from '../model/Predictions.js';
import equityService from '../services/AlphaVantage/equityService.js';

const equityRouter = express.Router()

equityRouter.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('equity')
  res.json(predictions)
})

equityRouter.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const prediction = await equityService.fetchEquityData(symbol)
  res.json(prediction)
})

equityRouter.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol;
  await equityService.fetchEquityData(symbol)
  res.send(`Data fetched for ${symbol}`)
});

export {
    equityRouter
}
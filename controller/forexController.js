import express from 'express';
import { Prediction } from '../model/Predictions.js';
import forexService from '../services/AlphaVantage/forexService.js';

const forexRouter = express.Router()

forexRouter.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('forex')
  res.json(predictions)
})

forexRouter.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol
  const prediction = await forexService.fetchForexData(symbol)
  res.json(prediction)
})

forexRouter.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol;
  await forexService.fetchForexData(symbol)
  res.send(`Data fetched for ${symbol}`);
})

export {
    forexRouter
}
import express from 'express';
import { Prediction } from '../model/Predictions.js';
import commodityService from '../services/AlphaVantage/commodityService.js';

const commodityRouter = express.Router()

commodityRouter.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('commodity')
  res.json(predictions)
})

commodityRouter.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const prediction = await commodityService.fetchCommodityData(symbol)
  res.json(prediction)
})

commodityRouter.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol;
  await commodityService.fetchCommodityData(symbol)
  res.send(`Data fetched for ${symbol}`)
})

export {
    commodityRouter
}
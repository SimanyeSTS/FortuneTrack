import express from 'express';
import { Prediction } from '../model/Predictions';
import commodityService from '../service/alphaVantage/commodityService';

const router = express.Router()

router.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('commodity')
  res.json(predictions)
})

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const prediction = await commodityService.fetchCommodityData(symbol)
  res.json(prediction)
})

router.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol;
  await commodityService.fetchCommodityData(symbol)
  res.send(`Data fetched for ${symbol}`)
})

export {
    commodityRouter
}
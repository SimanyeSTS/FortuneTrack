import express from 'express';
import { Prediction } from '../models/Predictions';
import forexService from '../service/alphaVantage/forexService';

const router = express.Router()

router.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('forex')
  res.json(predictions)
})

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol
  const prediction = await forexService.fetchForexData(symbol)
  res.json(prediction)
})

router.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol;
  await forexService.fetchForexData(symbol)
  res.send(`Data fetched for ${symbol}`);
})

export {
    forexRouter
}
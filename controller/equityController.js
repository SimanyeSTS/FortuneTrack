import express from 'express';
import { Prediction } from '../model/Predictions';
import equityService from '../service/alphaVantage/equityService';

const router = express.Router()

router.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('equity')
  res.json(predictions)
})

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const prediction = await equityService.fetchEquityData(symbol)
  res.json(prediction)
})

router.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol;
  await equityService.fetchEquityData(symbol)
  res.send(`Data fetched for ${symbol}`)
});

export {
    equityRouter
}
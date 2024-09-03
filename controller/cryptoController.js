import express from 'express';
import { Prediction } from '../model/Predictions.js';
import cryptoService from '../services/AlphaVantage/cryptoService.js';

const cryptoRouter = express.Router()

cryptoRouter.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('crypto')
  res.json(predictions)
})

cryptoRouter.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const prediction = await cryptoService.fetchCryptoData(symbol)
  res.json(prediction)
})

cryptoRouter.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol
  await cryptoService.fetchCryptoData(symbol)
  res.send(`Data fetched for ${symbol}`)
})

export {
    cryptoRouter
}
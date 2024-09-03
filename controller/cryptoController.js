import express from 'express';
import { Prediction } from '../model/Predictions';
import cryptoService from '../service/alphaVantage/cryptoService';

const router = express.Router()

router.get('/', async (req, res) => {
  const predictions = await Prediction.getAll('crypto')
  res.json(predictions)
})

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const prediction = await cryptoService.fetchCryptoData(symbol)
  res.json(prediction)
})

router.post('/fetch', async (req, res) => {
  const symbol = req.body.symbol;
  await cryptoService.fetchCryptoData(symbol)
  res.send(`Data fetched for ${symbol}`)
})

export {
    cryptoRouter
}
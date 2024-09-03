import express from 'express';
import { Prediction } from '../model/Predictions.js';
import cryptoService from '../services/AlphaVantage/cryptoService.js';

const cryptoRouter = express.Router()

cryptoRouter.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll('crypto')
    res.json(predictions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching crypto predictions' })
  }
})

cryptoRouter.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const prediction = await cryptoService.fetchCryptoData(symbol)
    res.json(prediction)
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Crypto data not found for symbol ${req.params.symbol}` })
  }
})

cryptoRouter.post('/fetch', async (req, res) => {
  try {
    const symbol = req.body.symbol
    await cryptoService.fetchCryptoData(symbol)
    res.send(`Data fetched for ${symbol}`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: `Error fetching crypto data for symbol ${req.body.symbol}` })
  }
})

export {
  cryptoRouter
}
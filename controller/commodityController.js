import express from 'express'
import { Prediction } from '../model/Predictions.js'
import commodityService from '../services/AlphaVantage/commodityService.js'

const commodityRouter = express.Router()

commodityRouter.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll('commodity')
    res.json({
      status: 200,
      results: predictions,
      message: predictions.length === 0 ? 'No commodity predictions found' : ''
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching commodity predictions' })
  }
})

commodityRouter.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol?.trim().toUpperCase()
    if (!symbol) {
      return res.status(400).json({ message: 'Symbol is required' })
    }
    const prediction = await commodityService.fetchCommodityData(symbol)
    res.json({
      status: 200,
      results: prediction,
      message: prediction ? '' : `Commodity data not found for symbol ${symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Commodity data not found for symbol ${req.params.symbol}` })
  }
})

commodityRouter.post('/fetch', async (req, res) => {
  try {
    const symbol = req.body.symbol?.trim().toUpperCase()
    if (!symbol) {
      return res.status(400).json({ message: 'Symbol is required' })
    }
    await commodityService.fetchCommodityData(symbol)
    res.json({
      status: 200,
      message: `Data fetched for ${symbol}`
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: `Error fetching commodity data for symbol ${req.body.symbol}` })
  }
})

commodityRouter.post('/', async (req, res) => {
    try {
      const prediction = req.body;
      const id = await Prediction.create(prediction);
      res.json({ status: 201, message: 'Commodity prediction created', id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating commodity prediction' });
    }
  });
  
  commodityRouter.put('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      const prediction = req.body;
      await Prediction.update(id, prediction);
      res.json({ status: 200, message: 'Commodity prediction updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating commodity prediction' });
    }
  });
  
  commodityRouter.delete('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      await Prediction.delete(id);
      res.json({ status: 200, message: 'Commodity prediction deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting commodity prediction' });
    }
  });

export {
  commodityRouter
}
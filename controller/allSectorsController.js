import express from 'express';
import { AllSectors } from '../model/AllSectors.js';

const allSectorsRouter = express.Router()

allSectorsRouter.get('/', async (req, res) => {
  try {
    const sectors = await AllSectors.getAll();
    res.json({
      status: 200,
      results: sectors,
      message: sectors.length === 0 ? 'No sectors found' : '',
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      results: [],
      message: error.message,
    })
  }
})

allSectorsRouter.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const prediction = await AllSectors.getBySymbol(symbol)
    if (prediction) {
      res.json({
        status: 200,
        result: prediction,
      })
    } else {
      res.status(404).json({
        status: 404,
        message: 'Prediction not found for symbol: ' + symbol,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    })
  }
})

export { allSectorsRouter }

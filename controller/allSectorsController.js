import express from 'express';
import { AllSectors } from '../model/AllSectors.js';

const allSectorsRouter = express.Router();

allSectorsRouter.get('/', async (req, res) => {
  try {
    const sectors = await AllSectors.getAll();
    res.status(200).json({
      status: 200,
      results: sectors,
      message: sectors.length === 0 ? 'No sectors found' : '',
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      results: [],
      message: 'An error occurred while fetching sectors.',
      error: error.message,
    })
  }
})

allSectorsRouter.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;

    if (!symbol) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid or missing symbol parameter.',
      })
    }

    const prediction = await AllSectors.getBySymbol(symbol);

    if (prediction) {
      res.status(200).json({
        status: 200,
        result: prediction,
      })
    } else {
      res.status(404).json({
        status: 404,
        message: `Prediction not found for symbol: ${symbol}`,
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'An error occurred while fetching the prediction.',
      error: error.message,
    })
  }
})

export { 
  allSectorsRouter 
}
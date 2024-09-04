import express from 'express';
import { Prediction } from '../model/Predictions.js'

const predictionRouter = express.Router();

predictionRouter.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll()
    res.json({
      status: 200,
      results: predictions,
      message: predictions.length === 0 ? 'No predictions found' : ''
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      status: 500, 
      results: [], 
      message: 'Error fetching predictions' 
    })
  }
})

predictionRouter.get('/:type', async (req, res) => {
  try {
    const type = req.params.type?.trim().toLowerCase()
    if (!type) {
      return res.status(400).json({ 
        status: 400, 
        results: [], 
        message: 'Type is required' 
      })
    }
    const predictions = await Prediction.getByType(type)
    res.json({
      status: 200,
      results: predictions,
      message: predictions.length === 0 ? `No predictions found for type ${type}` : ''
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      status: 500, 
      results: [], 
      message: 'Error fetching predictions by type' 
    })
  }
})

predictionRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ 
        status: 400, 
        results: [], 
        message: 'Invalid ID' 
      })
    }
    const prediction = await Prediction.getById(id)
    if (!prediction) {
      res.status(404).json({ 
        status: 404, 
        results: [], 
        message: 'Prediction not found' 
      })
    } else {
      res.json({
        status: 200,
        results: prediction,
        message: ''
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      status: 500, 
      results: [], 
      message: 'Error fetching prediction by ID' 
    })
  }
})

predictionRouter.post('/add', async (req, res) => {
  try {
    const prediction = req.body
    if (!prediction) {
      return res.status(400).json({ 
        status: 400, 
        results: [], 
        message: 'Prediction data is required' 
      })
    }
    const newPrediction = await Prediction.create(prediction)
    res.json({
      status: 201,
      results: newPrediction,
      message: 'Prediction added successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      status: 500, 
      results: [], 
      message: 'Error adding prediction' 
    })
  }
})

predictionRouter.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      return res.status(400).json({ 
        status: 400, 
        results: [], 
        message: 'Invalid ID' 
      })
    }
    const updatedPrediction = req.body
    if (!updatedPrediction) {
      return res.status(400).json({ 
        status: 400, 
        results: [], 
        message: 'Prediction data is required' 
      })
    }
    await Prediction.update(id, updatedPrediction)
    res.json({
      status: 200,
      results: [],
      message: 'Prediction updated successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ 
      status: 500, 
      results: [], 
      message: 'Error updating prediction' 
    })
  }
})

predictionRouter.delete('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({ 
          status: 400, 
          results: [], 
          message: 'Invalid ID' 
        })
      }
      await Prediction.delete(id)
      res.json({
        status: 200,
        results: [],
        message: 'Prediction deleted successfully'
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ 
        status: 500, 
        results: [], 
        message: 'Error deleting prediction' 
      })
    }
  })
  
  export {
    predictionRouter
  }
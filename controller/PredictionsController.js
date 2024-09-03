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
    const type = req.params.type;
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
    const id = req.params.id;
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
    const id = req.params.id
    const updatedPrediction = req.body
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
    const id = req.params.id
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
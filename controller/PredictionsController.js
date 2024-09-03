import express from 'express';
import { Prediction } from '../model/Predictions.js'

const predictionRouter = express.Router();

predictionRouter.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll()
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching predictions' })
  }
})

predictionRouter.get('/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const predictions = await Prediction.getByType(type)
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching predictions by type' })
  }
})

predictionRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const prediction = await Prediction.getById(id)
    if (!prediction) {
      res.status(404).json({ message: 'Prediction not found' })
    } else {
      res.json(prediction)
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prediction by ID' })
  }
})

predictionRouter.post('/add', async (req, res) => {
  try {
    const prediction = req.body
    const newPrediction = await Prediction.create(prediction)
    res.json(newPrediction)
  } catch (error) {
    res.status(500).json({ message: 'Error adding prediction' })
  }
})

predictionRouter.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedPrediction = req.body
    await Prediction.update(id, updatedPrediction)
    res.json({ message: 'Prediction updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating prediction' })
  }
})

predictionRouter.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Prediction.delete(id)
    res.json({ message: 'Prediction deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting prediction' })
  }
})

export {
    predictionRouter
}
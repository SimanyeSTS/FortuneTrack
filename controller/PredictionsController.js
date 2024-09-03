import express from 'express';
import { Prediction } from '../models/Predictions'

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const predictions = await Prediction.getAll()
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching predictions' })
  }
})

router.get('/:type', async (req, res) => {
  try {
    const type = req.params.type;
    const predictions = await Prediction.getByType(type)
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching predictions by type' })
  }
})

router.get('/:id', async (req, res) => {
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

router.post('/add', async (req, res) => {
  try {
    const prediction = req.body
    const newPrediction = await Prediction.create(prediction)
    res.json(newPrediction)
  } catch (error) {
    res.status(500).json({ message: 'Error adding prediction' })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedPrediction = req.body
    await Prediction.update(id, updatedPrediction)
    res.json({ message: 'Prediction updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating prediction' })
  }
})

router.delete('/:id', async (req, res) => {
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
import express from 'express';
import ForecastAffector from '../model/ForecastAffectors';

const foreAffRouter = express.Router()

foreAffRouter.get('/', async (req, res) => {
  try {
    const affectors = await ForecastAffector.getAll()
    res.json({
      status: 200,
      results: affectors,
      message: affectors.length === 0 ? 'No forecast affectors found' : ''
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching forecast affectors' })
  }
})

foreAffRouter.get('/:predictionId', async (req, res) => {
  try {
    const predictionId = req.params.predictionId;
    const affectors = await ForecastAffector.getByPredictionId(predictionId)
    res.json({
      status: 200,
      results: affectors,
      message: affectors.length === 0 ? `Forecast affectors not found for prediction ID ${req.params.predictionId}` : ''
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Forecast affectors not found for prediction ID ${req.params.predictionId}` })
  }
})

export {
  foreAffRouter
}
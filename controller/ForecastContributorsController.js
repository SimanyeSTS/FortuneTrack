import express from 'express';
import ForecastContributor from '../models/ForecastContributors';

const forConRouter = express.Router()

forConRouter.get('/', async (req, res) => {
  try {
    const contributors = await ForecastContributor.getAll()
    res.json({
      status: 200,
      results: contributors,
      message: contributors.length === 0 ? 'No forecast contributors found' : ''
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Error fetching forecast contributors' })
  }
})

forConRouter.get('/:predictionId', async (req, res) => {
  try {
    const predictionId = req.params.predictionId;
    const contributors = await ForecastContributor.getByPredictionId(predictionId);
    res.json({
      status: 200,
      results: contributors,
      message: contributors.length === 0 ? `Forecast contributors not found for prediction ID ${req.params.predictionId}` : ''
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Forecast contributors not found for prediction ID ${req.params.predictionId}` })
  }
})

export {
  forConRouter
}
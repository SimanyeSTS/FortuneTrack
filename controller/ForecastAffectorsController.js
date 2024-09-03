import express from 'express';
import ForecastAffector from '../model/ForecastAffectors';

const foreAffRouter = express.Router()

foreAffRouter.get('/', async (req, res) => {
  const affectors = await ForecastAffector.getAll()
  res.json(affectors)
})

foreAffRouter.get('/:predictionId', async (req, res) => {
  const predictionId = req.params.predictionId;
  const affectors = await ForecastAffector.getByPredictionId(predictionId)
  res.json(affectors)
})

export {
    foreAffRouter
}
import express from 'express';
import ForecastAffector from '../model/ForecastAffectors';

const router = express.Router()

router.get('/', async (req, res) => {
  const affectors = await ForecastAffector.getAll()
  res.json(affectors)
})

router.get('/:predictionId', async (req, res) => {
  const predictionId = req.params.predictionId;
  const affectors = await ForecastAffector.getByPredictionId(predictionId)
  res.json(affectors)
})

export {
    foreAffRouter
}
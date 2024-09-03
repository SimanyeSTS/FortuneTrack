import express from 'express';
import ForecastContributor from '../models/ForecastContributors';

const router = express.Router()

router.get('/', async (req, res) => {
  const contributors = await ForecastContributor.getAll()
  res.json(contributors)
})

router.get('/:predictionId', async (req, res) => {
  const predictionId = req.params.predictionId;
  const contributors = await ForecastContributor.getByPredictionId(predictionId);
  res.json(contributors);
})

export {
    forConRouter
}
import express from 'express';
import ForecastContributor from '../models/ForecastContributors';

const forConRouter = express.Router()

forConRouter.get('/', async (req, res) => {
  const contributors = await ForecastContributor.getAll()
  res.json(contributors)
})

forConRouter.get('/:predictionId', async (req, res) => {
  const predictionId = req.params.predictionId;
  const contributors = await ForecastContributor.getByPredictionId(predictionId);
  res.json(contributors);
})

export {
    forConRouter
}
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
    const predictionId = parseInt(req.params.predictionId);
    if (isNaN(predictionId)) {
      return res.status(400).json({ message: 'Invalid prediction ID' });
    }
    const contributors = await ForecastContributor.getByPredictionId(predictionId);
    res.json({
      status: 200,
      results: contributors,
      message: contributors.length === 0 ? `Forecast contributors not found for prediction ID ${predictionId}` : ''
    })
  } catch (err) {
    console.error(err)
    res.status(404).json({ message: `Forecast contributors not found for prediction ID ${req.params.predictionId}` })
  }
})

forConRouter.post('/', async (req, res) => {
    try {
      const contributor = req.body;
      const id = await ForecastContributor.create(contributor);
      res.json({ status: 201, message: 'Forecast contributor created', id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating forecast contributor' });
    }
  });
  
  forConRouter.put('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' })
      }
      const contributor = req.body;
      await ForecastContributor.update(id, contributor);
      res.json({ status: 200, message: 'Forecast contributor updated' })
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating forecast contributor' })
    }
  });
  
  forConRouter.delete('/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
      }
      await ForecastContributor.delete(id)
      res.json({ status: 200, message: 'Forecast contributor deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting forecast contributor' });
    }
  })

export {
  forConRouter
}
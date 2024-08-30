import express from 'express';
import { Predictions } from '../model/Predictions.js';

const predictionsRouter = express.Router()

predictionsRouter.use(express.json())

predictionsRouter.get('/', (req, res) => {
    Predictions.fetchPredictions(req, res)
})

predictionsRouter.get('/:ID', (req, res) => {
    Predictions.fetchPrediction(req, res)
})

predictionsRouter.post('/', (req, res) => {
    Predictions.addPrediction(req, res)
})

predictionsRouter.patch('/:ID', (req, res) => {
    Predictions.updatePrediction(req, res)
})

predictionsRouter.delete('/:ID', (req, res) => {
    Predictions.deletePrediction(req, res)
})

predictionsRouter.post('/google-trends', async (req, res) => {
    await Predictions.fetchGoogleTrendsPrediction(req, res)
})

predictionsRouter.post('/twitter', async ( req, res) => {
    await Predictions.fetchTwitterPrediction(req, res)
})

export {
    express,
    predictionsRouter
}
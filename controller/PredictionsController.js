import express from 'express'
import bodyParser from 'body-parser';
import { Predictions } from '../model/Predictions.js'

const predictionsRouter = express.Router()
const predictions = new Predictions()

predictionsRouter.use(bodyParser.json())

predictionsRouter.get('/', async (req, res) => {
    try {
        await predictions.fetchPredictions(req, res)
    } catch (e) {
        console.error('Error fetching all predictions:', e)
        res.status(500).json({
            status: 500,
            msg: "Unable to fetch predictions. Please try again later."
        })
    }
})

predictionsRouter.get('/:ID', async (req, res) => {
    try {
        await predictions.fetchPrediction(req, res)
    } catch (e) {
        console.error('Error fetching prediction by ID:', e)
        res.status(500).json({
            status: 500,
            msg: "Unable to fetch the prediction. Please try again later."
        })
    }
})

predictionsRouter.post('/', async (req, res) => {
    try {
        await predictions.addPrediction(req, res)
    } catch (e) {
        console.error('Error adding new prediction:', e)
        res.status(500).json({
            status: 500,
            msg: "Error adding prediction."
        })
    }
})

predictionsRouter.patch('/:ID', async (req, res) => {
    try {
        await predictions.updatePrediction(req, res)
    } catch (e) {
        console.error('Error updating prediction:', e)
        res.status(500).json({
            status: 500,
            msg: "Error updating prediction."
        })
    }
})

predictionsRouter.delete('/:ID', async (req, res) => {
    try {
        await predictions.deletePrediction(req, res)
    } catch (e) {
        console.error('Error deleting prediction:', e)
        res.status(500).json({
            status: 500,
            msg: "Error deleting prediction."
        })
    }
})

predictionsRouter.post('/store-google-trends', async (req, res) => {
    try {
        await predictions.storeGoogleTrendsPrediction()
        res.json({
            status: res.statusCode,
            msg: "Google Trends predictions stored successfully."
        });
    } catch (e) {
        console.error('Error storing Google Trends predictions:', e)
        res.status(500).json({
            status: 500,
            msg: "Error storing Google Trends predictions."
        })
    }
})

/*
predictionsRouter.post('/store-twitter', async (req, res) => {
    try {
        await predictions.storeTwitterPrediction();
        res.json({
            status: res.statusCode,
            msg: "Twitter predictions stored successfully."
        });
    } catch (e) {
        console.error('Error storing Twitter predictions:', e);
        res.status(500).json({
            status: 500,
            msg: "Error storing Twitter predictions."
        });
    }
});
*/

export {
    predictionsRouter
}

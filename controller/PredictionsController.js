import express from 'express';
import bodyParser from 'body-parser';
import { Predictions } from '../model/Predictions.js'; // Adjust the import path if needed

const predictionsRouter = express.Router();
const predictions = new Predictions(); // Create an instance of the Predictions class

predictionsRouter.use(bodyParser.json());

// Route to fetch all predictions
predictionsRouter.get('/', (req, res) => {
    predictions.fetchPredictions(req, res);
});

// Route to fetch a single prediction by ID
predictionsRouter.get('/:ID', (req, res) => {
    predictions.fetchPrediction(req, res);
});

// Route to add a new prediction
predictionsRouter.post('/', (req, res) => {
    predictions.addPrediction(req, res);
});

// Route to update an existing prediction
predictionsRouter.patch('/:ID', (req, res) => {
    predictions.updatePrediction(req, res);
});

// Route to delete a prediction
predictionsRouter.delete('/:ID', (req, res) => {
    predictions.deletePrediction(req, res);
});

// Route to store Google Trends predictions
predictionsRouter.post('/store-google-trends', async (req, res) => {
    try {
        await predictions.storeGoogleTrendsPrediction();
        res.json({
            status: res.statusCode,
            msg: "Google Trends predictions stored successfully."
        });
    } catch (e) {
        console.error('Error storing Google Trends predictions:', e);
        res.status(500).json({
            status: 500,
            msg: "Error storing Google Trends predictions."
        });
    }
});

// Uncomment the following lines if you want to expose endpoints for storing Twitter predictions only
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
};

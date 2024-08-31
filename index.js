import express from "express";
import cors from "cors";
import path from "path";
import { userRouter } from "./controller/UserController.js";
import { predictionsRouter } from "./controller/PredictionsController.js";
import { predictions } from "./model/index.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: '*',
    credentials: true,
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: ['Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./static'));

app.use('/users', userRouter);
app.use('/user', userRouter);

app.use('/predictions', predictionsRouter);
app.use('/prediction', predictionsRouter);

// Endpoint for Google Trends predictions
app.get('/run-google-trends-predictions', async (req, res) => {
    try {
        await predictions.storeGoogleTrendsPrediction();
        res.status(200).json({ msg: 'Google Trends predictions fetched and stored successfully.' });
    } catch (e) {
        console.error('Error running Google Trends predictions:', e);
        res.status(500).json({ msg: 'Failed to fetch and store Google Trends predictions.' });
    }
});

// Commented out Twitter-related endpoint
/*
app.get('/run-twitter-predictions', async (req, res) => {
    try {
        await predictions.storeTwitterPrediction();
        res.status(200).json({ msg: 'Twitter predictions fetched and stored successfully.' });
    } catch (e) {
        console.error('Error running Twitter predictions:', e);
        res.status(500).json({ msg: 'Failed to fetch and store Twitter predictions.' });
    }
});
*/

app.get('^/$|FortuneTrack', (req, res) => {
    res.status(200).sendFile(path.resolve('./static/index.html'));
});

app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        msg: 'Resource not found'
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

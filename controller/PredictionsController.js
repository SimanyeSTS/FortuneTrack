import express from 'express';
import { Predictions } from '../model/Predictions.js'; 

const predictionsRouter = express.Router();
const predictions = new Predictions(); // Create an instance of Predictions

predictionsRouter.use(express.json());

predictionsRouter.get('/', (req, res) => {
    predictions.fetchPredictions(req, res); // Call instance method
});

predictionsRouter.get('/:ID', (req, res) => {
    predictions.fetchPrediction(req, res); // Call instance method
});

predictionsRouter.post('/', (req, res) => {
    predictions.addPrediction(req, res); // Call instance method
});

predictionsRouter.patch('/:ID', (req, res) => {
    predictions.updatePrediction(req, res); // Call instance method
});

predictionsRouter.delete('/:ID', (req, res) => {
    predictions.deletePrediction(req, res); // Call instance method
});

predictionsRouter.post('/google-trends', async (req, res) => {
    try {
        const { category, subcategoryID } = req.body;
        const categoryQueries = {
            Retail: 'Headboard H&M',
            Technology: 'iPhone AWS',
            'Food & Beverages': 'Coca-Cola McDonalds',
            Healthcare: 'Pfizer Clicks'
        };
        
        const keywords = categoryQueries[category];
        if (!keywords) {
            return res.status(400).json({
                status: 400,
                msg: `No keywords defined for category: ${category}`
            });
        }

        const googleTrendsResults = await fetchGoogleTrendsData(keywords);

        const averageValue = googleTrendsResults.default.averages[0];
        await predictions.fetchGoogleTrendsPrediction({
            body: {
                subcategoryID,
                keywords
            }
        }, res);

        res.json({
            status: res.statusCode,
            msg: "Google Trends prediction stored successfully."
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: "Error fetching Google Trends prediction."
        });
    }
});

predictionsRouter.post('/twitter', async (req, res) => {
    try {
        const { category, subcategoryID } = req.body;
        const categoryQueries = {
            Retail: 'Headboard H&M',
            Technology: 'iPhone AWS',
            'Food & Beverages': 'Coca-Cola McDonalds',
            Healthcare: 'Pfizer Clicks'
        };
        
        const query = categoryQueries[category];
        if (!query) {
            return res.status(400).json({
                status: 400,
                msg: `No query defined for category: ${category}`
            });
        }

        const twitterResults = await fetchTwitterData(query);

        const tweetCount = twitterResults.length;
        await predictions.fetchTwitterPrediction({
            body: {
                subcategoryID,
                query
            }
        }, res);

        res.json({
            status: res.statusCode,
            msg: "Twitter prediction stored successfully."
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: "Error fetching Twitter prediction."
        });
    }
});

export {
    predictionsRouter
};

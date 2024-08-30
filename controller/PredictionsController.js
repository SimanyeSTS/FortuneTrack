import express from 'express';
import { Predictions } from '../model/Predictions.js';
import { fetchGoogleTrendsData } from '../services/googleTrendsService.js';
import { fetchTwitterData } from '../services/twitterService.js';

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
    try {
        const { category, subcategoryID } = req.body;
        const categoryQueries = {
            Retail: 'Headboard H&M',
            Technology: 'iPhone AWS',
            'Food & Beverages': 'Coca-Cola McDonalds',
            Healthcare: 'Pfizer Clicks'
        }
        
        const keywords = categoryQueries[category];
        if (!keywords) {
            return res.status(400).json({
                status: 400,
                msg: `No keywords defined for category: ${category}`
            })
        }

        const googleTrendsResults = await fetchGoogleTrendsData(keywords);

        const averageValue = googleTrendsResults.default.averages[0];
        await Predictions.fetchGoogleTrendsPrediction({
            body: {
                subcategoryID,
                keywords
            }
        }, res)

        res.json({
            status: res.statusCode,
            msg: "Google Trends prediction stored successfully."
        })
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: "Error fetching Google Trends prediction."
        })
    }
})

predictionsRouter.post('/twitter', async (req, res) => {
    try {
        const { category, subcategoryID } = req.body;
        const categoryQueries = {
            Retail: 'Headboard H&M',
            Technology: 'iPhone AWS',
            'Food & Beverages': 'Coca-Cola McDonalds',
            Healthcare: 'Pfizer Clicks'
        }
        
        const query = categoryQueries[category];
        if (!query) {
            return res.status(400).json({
                status: 400,
                msg: `No query defined for category: ${category}`
            })
        }

        const twitterResults = await fetchTwitterData(query);

        const tweetCount = twitterResults.length;
        await Predictions.fetchTwitterPrediction({
            body: {
                subcategoryID,
                query
            }
        }, res)

        res.json({
            status: res.statusCode,
            msg: "Twitter prediction stored successfully."
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            msg: "Error fetching Twitter prediction."
        })
    }
})

export {
    predictionsRouter
}

import { connection as db } from "../config/index.js"
import { fetchGoogleTrendsData } from '../services/googleTrendsService.js'
import { fetchTwitterData } from '../services/twitterService.js'

class Predictions {
    fetchPredictions(req, res) {
        try {
            const strQry = `
            SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
            FROM Predictions P
            JOIN Subcategories S
            ON P.subcategoryID = S.subcategoryID
            JOIN Categories C
            ON S.categoryID = C.categoryID
            `
            db.query(strQry, (err, results) => {
                if (err) throw new Error('An error occurred while retrieving predictions')
                res.json({
                    status: res.statusCode,
                    results
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: "Unable to fetch predictions. Please try again later."
            })
        }
    }

    fetchPrediction(req, res) {
        try {
            const strQry = `
            SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
            FROM Predictions P
            JOIN Subcategories S
            ON P.subcategoryID = S.subcategoryID
            JOIN Categories C
            ON S.categoryID = C.categoryID
            WHERE P.predictionID = ${req.params.ID}
            `
            db.query(strQry, (err, result) => {
                if (err) throw new Error('Error fetching prediction')
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: "Unable to fetch the prediction. Please try again later."
            })
        }
    }

    addPrediction(req, res) {
        try {
            const { subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish } = req.body
            const strQry = `
            INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
            VALUES (?, ?, ?, ?, ?)
            `
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish], (err, results) => {
                if (err) throw new Error('Error adding prediction')
                res.json({
                    status: res.statusCode,
                    msg: "Prediction added successfully.",
                    result: results
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: "Error adding prediction."
            })
        }
    }

    updatePrediction(req, res) {
        try {
            const { subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish } = req.body
            const strQry = `
            UPDATE Predictions
            SET subcategoryID = ?, SOURCE = ?, predictionDate = ?, VALUE = ?, bullishBearish = ?
            WHERE predictionID = ${req.params.ID}
            `
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish], (err) => {
                if (err) throw new Error('Error updating prediction')
                res.json({
                    status: res.statusCode,
                    msg: "Prediction updated successfully."
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: "Error updating prediction."
            })
        }
    }

    deletePrediction(req, res) {
        try {
            const strQry = `
            DELETE FROM Predictions
            WHERE predictionID = ${req.params.ID}
            `
            db.query(strQry, (err) => {
                if (err) throw new Error('Error deleting prediction')
                res.json({
                    status: res.statusCode,
                    msg: "Prediction deleted successfully."
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: "Error deleting prediction."
            })
        }
    }

    async fetchGoogleTrendsPrediction(req, res) {
        try {
            const keywords = req.body.keywords
            const googleTrendsResults = await fetchGoogleTrendsData(keywords)

            const averageValue = googleTrendsResults.default.averages[0]
            const strQry = `
            INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
            VALUES (?, 'google_trends', NOW(), ?, 'Bullish')
            `
            db.query(strQry, [req.body.subcategoryID, averageValue], (err, results) => {
                if (err) throw new Error('Error inserting Google Trends prediction into database')
                res.json({
                    status: res.statusCode,
                    msg: "Google Trends prediction stored successfully."
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: "Error fetching Google Trends prediction."
            })
        }
    }

    async fetchTwitterPrediction(req, res) {
        try {
            const query = req.body.query
            const twitterResults = await fetchTwitterData(query)

            const tweetCount = twitterResults.length
            const strQry = `
            INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
            VALUES (?, 'twitter', NOW(), ?, 'Bullish')
            `
            db.query(strQry, [req.body.subcategoryID, tweetCount], (err, results) => {
                if (err) throw new Error('Error inserting Twitter prediction into database')
                res.json({
                    status: res.statusCode,
                    msg: "Twitter prediction stored successfully."
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: "Error fetching Twitter prediction."
            })
        }
    }
}

export {
    Predictions
}

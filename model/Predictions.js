import cron from 'node-cron';
import { connection as db } from "../config/index.js";
import { fetchGoogleTrendsData } from '../services/serpApiService.js'; // Updated import
// import { fetchTwitterData } from '../services/twitterService.js'; // Commented out

class Predictions {
    // Fetch all predictions from the database
    fetchPredictions(req, res) {
        try {
            const strQry = `
                SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
                FROM Predictions P
                JOIN Subcategories S ON P.subcategoryID = S.subcategoryID
                JOIN Categories C ON S.categoryID = C.categoryID
            `;
            db.query(strQry, (err, results) => {
                if (err) {
                    console.error('Error retrieving predictions:', err);
                    return res.status(500).json({
                        status: 500,
                        msg: "Unable to fetch predictions. Please try again later."
                    });
                }
                res.json({
                    status: res.statusCode,
                    results
                });
            });
        } catch (e) {
            console.error('Error in fetchPredictions method:', e);
            res.status(500).json({
                status: 500,
                msg: "Unable to fetch predictions. Please try again later."
            });
        }
    }

    // Fetch a single prediction by ID
    fetchPrediction(req, res) {
        try {
            const strQry = `
                SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
                FROM Predictions P
                JOIN Subcategories S ON P.subcategoryID = S.subcategoryID
                JOIN Categories C ON S.categoryID = C.categoryID
                WHERE P.predictionID = ?
            `;
            db.query(strQry, [req.params.ID], (err, result) => {
                if (err) {
                    console.error('Error fetching prediction:', err);
                    return res.status(500).json({
                        status: 500,
                        msg: "Unable to fetch the prediction. Please try again later."
                    });
                }
                res.json({
                    status: res.statusCode,
                    result: result[0]
                });
            });
        } catch (e) {
            console.error('Error in fetchPrediction method:', e);
            res.status(500).json({
                status: 500,
                msg: "Unable to fetch the prediction. Please try again later."
            });
        }
    }

    // Add a new prediction
    addPrediction(req, res) {
        try {
            const { subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish } = req.body;
            const strQry = `
                INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
                VALUES (?, ?, ?, ?, ?)
            `;
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish], (err, results) => {
                if (err) {
                    console.error('Error adding prediction:', err);
                    return res.status(500).json({
                        status: 500,
                        msg: "Error adding prediction."
                    });
                }
                res.json({
                    status: res.statusCode,
                    msg: "Prediction added successfully.",
                    result: results
                });
            });
        } catch (e) {
            console.error('Error in addPrediction method:', e);
            res.status(500).json({
                status: 500,
                msg: "Error adding prediction."
            });
        }
    }

    // Update an existing prediction
    updatePrediction(req, res) {
        try {
            const { subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish } = req.body;
            const strQry = `
                UPDATE Predictions
                SET subcategoryID = ?, SOURCE = ?, predictionDate = ?, VALUE = ?, bullishBearish = ?
                WHERE predictionID = ?
            `;
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish, req.params.ID], (err) => {
                if (err) {
                    console.error('Error updating prediction:', err);
                    return res.status(500).json({
                        status: 500,
                        msg: "Error updating prediction."
                    });
                }
                res.json({
                    status: res.statusCode,
                    msg: "Prediction updated successfully."
                });
            });
        } catch (e) {
            console.error('Error in updatePrediction method:', e);
            res.status(500).json({
                status: 500,
                msg: "Error updating prediction."
            });
        }
    }

    // Delete a prediction
    deletePrediction(req, res) {
        try {
            const strQry = `
                DELETE FROM Predictions
                WHERE predictionID = ?
            `;
            db.query(strQry, [req.params.ID], (err) => {
                if (err) {
                    console.error('Error deleting prediction:', err);
                    return res.status(500).json({
                        status: 500,
                        msg: "Error deleting prediction."
                    });
                }
                res.json({
                    status: res.statusCode,
                    msg: "Prediction deleted successfully."
                });
            });
        } catch (e) {
            console.error('Error in deletePrediction method:', e);
            res.status(500).json({
                status: 500,
                msg: "Error deleting prediction."
            });
        }
    }

    // Store Google Trends predictions
    async storeGoogleTrendsPrediction() {
        try {
            const keywordsMap = {
                'Retail': ['Headboard'],
                'Fashion': ['H&M'],
                'Gadgets': ['iPhone'],
                'Cloud Services': ['AWS'],
                'Soft Drinks': ['Coca-Cola'],
                'Fast Food': ['McDonalds'],
                'Pharmaceuticals': ['Pfizer'],
                'Health Stores': ['Clicks']
            };

            for (const [category, keywords] of Object.entries(keywordsMap)) {
                const googleTrendsResults = await fetchGoogleTrendsData(category);
                const { lowestRecord, averageRecord, highestRecord, status } = googleTrendsResults;

                const subcategoryID = await this.getSubcategoryID(category);

                if (subcategoryID) {
                    const strQry = `
                        INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
                        VALUES (?, 'google_trends', NOW(), ?, ?)
                    `;
                    db.query(strQry, [subcategoryID, averageRecord, status], (err) => {
                        if (err) {
                            console.error(`Error inserting Google Trends prediction for ${category}:`, err);
                        } else {
                            console.log(`Google Trends prediction for ${category} stored successfully.`);
                        }
                    });
                } else {
                    console.warn(`No subcategoryID found for category: ${category}`);
                }
            }
        } catch (e) {
            console.error("Error fetching Google Trends prediction:", e);
        }
    }

    // Commented out Twitter prediction method
    /*
    async storeTwitterPrediction() {
        try {
            const keywordsMap = {
                'Retail': ['Headboard'],
                'Fashion': ['H&M'],
                'Gadgets': ['iPhone'],
                'Cloud Services': ['AWS'],
                'Soft Drinks': ['Coca-Cola'],
                'Fast Food': ['McDonalds'],
                'Pharmaceuticals': ['Pfizer'],
                'Health Stores': ['Clicks']
            };

            for (const [category, query] of Object.entries(keywordsMap)) {
                const twitterResults = await fetchTwitterData(category);
                const tweetCount = twitterResults.averagePercentage;

                const subcategoryID = await this.getSubcategoryID(category);

                if (subcategoryID) {
                    const strQry = `
                        INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
                        VALUES (?, 'twitter', NOW(), ?, 'Bullish')
                    `;
                    db.query(strQry, [subcategoryID, tweetCount], (err) => {
                        if (err) {
                            console.error(`Error inserting Twitter prediction for ${category}:`, err);
                        } else {
                            console.log(`Twitter prediction for ${category} stored successfully.`);
                        }
                    });
                } else {
                    console.warn(`No subcategoryID found for category: ${category}`);
                }
            }
        } catch (e) {
            console.error("Error fetching Twitter prediction:", e);
        }
    }
    */

    // Retrieve subcategoryID by category name
    async getSubcategoryID(category) {
        const strQry = `SELECT subcategoryID FROM Subcategories WHERE subcategoryName = ?`;
        return new Promise((resolve, reject) => {
            db.query(strQry, [category], (err, results) => {
                if (err) {
                    console.error('Error retrieving subcategoryID:', err);
                    return reject(err);
                }
                console.log(`Query results for ${category}:`, results); // Log query results
                if (results.length === 0) {
                    console.warn(`No subcategoryID found for category: ${category}`);
                }
                resolve(results[0]?.subcategoryID);
            });
        });
    }
}

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', () => {
    const predictions = new Predictions();
    predictions.storeGoogleTrendsPrediction();
    // predictions.storeTwitterPrediction(); // Commented out
});

export {
    Predictions
} 

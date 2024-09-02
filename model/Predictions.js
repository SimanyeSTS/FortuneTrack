import cron from 'node-cron';
import { connection as db } from "../config/index.js";
import { fetchGoogleTrendsData } from '../services/serpApiService.js';

class Predictions {
    async fetchPredictions(req, res) {
        try {
            const strQry = `
                SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
                FROM Predictions P
                JOIN Subcategories S ON P.subcategoryID = S.subcategoryID
                JOIN Categories C ON S.categoryID = C.categoryID;
            `
            db.query(strQry, (err, results) => {
                if (err) {
                    console.error('Error retrieving predictions:', err)
                    return res.status(500).json({
                        status: 500,
                        msg: "Unable to fetch predictions. Please try again later."
                    })
                }
                res.json({
                    status: res.statusCode,
                    results
                })
            })
        } catch (e) {
            console.error('Error in fetchPredictions method:', e)
            res.status(500).json({
                status: 500,
                msg: "Unable to fetch predictions. Please try again later."
            })
        }
    }

    async fetchPrediction(req, res) {
        try {
            const strQry = `
                SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
                FROM Predictions P
                JOIN Subcategories S ON P.subcategoryID = S.subcategoryID
                JOIN Categories C ON S.categoryID = C.categoryID
                WHERE P.predictionID = ?;
            `
            db.query(strQry, [req.params.ID], (err, result) => {
                if (err) {
                    console.error('Error fetching prediction:', err);
                    return res.status(500).json({
                        status: 500,
                        msg: "Unable to fetch the prediction. Please try again later."
                    })
                }
                res.json({
                    status: res.statusCode,
                    result: result[0]
                })
            })
        } catch (e) {
            console.error('Error in fetchPrediction method:', e)
            res.status(500).json({
                status: 500,
                msg: "Unable to fetch the prediction. Please try again later."
            })
        }
    }

    async addPrediction(req, res) {
        try {
            const { subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish } = req.body;
            const strQry = `
                INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
                VALUES (?, ?, ?, ?, ?);
            `
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish], (err, results) => {
                if (err) {
                    console.error('Error adding prediction:', err)
                    return res.status(500).json({
                        status: 500,
                        msg: "Error adding prediction."
                    })
                }
                res.json({
                    status: res.statusCode,
                    msg: "Prediction added successfully.",
                    result: results
                })
            })
        } catch (e) {
            console.error('Error in addPrediction method:', e)
            res.status(500).json({
                status: 500,
                msg: "Error adding prediction."
            })
        }
    }

    async updatePrediction(req, res) {
        try {
            const { subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish } = req.body;
            const strQry = `
                UPDATE Predictions
                SET subcategoryID = ?, SOURCE = ?, predictionDate = ?, VALUE = ?, bullishBearish = ?
                WHERE predictionID = ?;
            `
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish, req.params.ID], (err) => {
                if (err) {
                    console.error('Error updating prediction:', err)
                    return res.status(500).json({
                        status: 500,
                        msg: "Error updating prediction."
                    })
                }
                res.json({
                    status: res.statusCode,
                    msg: "Prediction updated successfully."
                })
            })
        } catch (e) {
            console.error('Error in updatePrediction method:', e)
            res.status(500).json({
                status: 500,
                msg: "Error updating prediction."
            })
        }
    }

    async deletePrediction(req, res) {
        try {
            const strQry = `
                DELETE FROM Predictions
                WHERE predictionID = ?;
            `
            db.query(strQry, [req.params.ID], (err) => {
                if (err) {
                    console.error('Error deleting prediction:', err);
                    return res.status(500).json({
                        status: 500,
                        msg: "Error deleting prediction."
                    })
                }
                res.json({
                    status: res.statusCode,
                    msg: "Prediction deleted successfully."
                })
            })
        } catch (e) {
            console.error('Error in deletePrediction method:', e)
            res.status(500).json({
                status: 500,
                msg: "Error deleting prediction."
            })
        }
    }

   async storeGoogleTrendsPrediction() {
    try {
      const categorySubcategoryMap = {
        'Retail': ['Furniture', 'Fashion'],
        'Technology': ['Gadgets', 'Cloud Services'],
        'Food & Beverages': ['Soft Drinks', 'Fast Food'],
        'Healthcare': ['Pharmaceuticals', 'Health Stores']
      }

      const categories = ['Retail', 'Technology', 'Food & Beverages', 'Healthcare']

      for (const category of categories) {
        const subcategoryNames = categorySubcategoryMap[category]

        for (const subcategoryName of subcategoryNames) {
          const googleTrendsResults = await fetchGoogleTrendsData(category);
          const { combinedResults } = googleTrendsResults;

          const subcategoryID = await this.getSubcategoryID(subcategoryName);

          if (subcategoryID) {
            if (combinedResults.averageRecord !== null) {
              const strQry = `
                INSERT INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
                VALUES (?, 'google_trends', NOW(), ?, ?);
              `
              await db.execute(strQry, [subcategoryID, combinedResults.averageRecord, combinedResults.status]);
              console.log(`Google Trends prediction for ${subcategoryName} stored successfully.`)
            } else {
              console.log(`Skipping Google Trends prediction for ${subcategoryName} due to null averageRecord value.`)
            }
          } else {
            console.warn(`No subcategoryID found for subcategory: ${subcategoryName}`)
          }
        }
      }
    } catch (e) {
      console.error("Error fetching Google Trends prediction:", e)
    }
  }

async getSubcategoryID(subcategoryName) {
    const strQry = `
    SELECT subcategoryID FROM Subcategories WHERE subcategoryName = ?;
    `
    try {
      const result = await db.execute(strQry, [subcategoryName])
      if (!result) {
        throw new Error(`No results found for query: ${strQry}`)
      }
      const rows = result[0]
      console.log(`Query results for ${subcategoryName}:`, rows)
      if (rows.length === 0) {
        console.warn(`No subcategoryID found for category: ${subcategoryName}`)
      }
      return rows[0]?.subcategoryID
    } catch (err) {
      console.error(`Error retrieving subcategoryID for ${subcategoryName}:`, err)
      return null
    }
  }
}

cron.schedule('0 0 * * *', async () => {
  try {
    const predictions = new Predictions()
    await predictions.storeGoogleTrendsPrediction()
  } catch (error) {
    console.error("Error running cron job:", error)
  }
});

export {
  Predictions
}

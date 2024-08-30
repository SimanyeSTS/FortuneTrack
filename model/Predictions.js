import { connection as db } from "../config/index.js";

class Predictions {
    fetchPredictions(req, res) {
        try {
            const strQry = `
            SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
            FROM Predictions P
            JOIN Subcategories S
            ON P.subcategoryID = S.subcategoryID
            JOIN Categories C
            ON S.categoryID = C.categoryID;
            `
            db.query(strQry, (err, results) => {
                if (err) throw new Error('An error occurred while retrieving predictions.')
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
       try{
        const strQry = `
        SELECT P.predictionID, P.subcategoryID, S.subcategoryName, C.subcategoryName, C.categoryName, P.SOURCE, P.predictionDate, P.VALUE, P.bullishBearish
        FROM Predictions P
        JOIN Subcategories S
        ON P.subcategoryID = S.subcategoryID
        JOIN Category C
        ON S.categoryID = C.categoryID
        WHERE p.predictionID = ${req.params.ID};
        `
        db.query(strQry, (err, result) => {
            if (err) throw new Error('Error fetching prediction.')
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

}
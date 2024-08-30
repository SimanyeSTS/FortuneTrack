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
    addPrediction(req, res) {
        try {
            const { subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish } = req.body
            const strQry = `
            INSER INTO Predictions (subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish)
            VALUES (?, ?, ?, ?, ?);
            `
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish], (err, results) => {
                if (err) throw new Error('Error adding prediction.')
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
            WHERE predictionID = ${req.params.ID};
            `
            db.query(strQry, [subcategoryID, SOURCE, predictionDate, VALUE, bullishBearish], (err) => {
                if (err) throw new Error('Error updating prediction.')
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
    
}
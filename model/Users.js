import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/UserAuth.js";
import { compare, hash } from "bcrypt";

class Users {
    fetchUsers(req, res) {
        try {
            const strQry = `
            SELECT userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile, createdAt, updatedAt
            FROM Users; 
            `
            db.query(strQry, (err, results) => {
                if (err) throw new Error('Our apologies, a issue seems to have occured when retrieving the users. Please try again later.')
                    res.json({
                    status: res.statusCode,
                    results
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: "Please try again later"
            })
        }
    }
    fetchUser(req, res) {
        try {
            const strQry = `
            SELECT userID, firstName, lastName, userAge, gender, emailAdd, userPass, userProfile, createdAt, updatedAt
            FROM Users
            WHERE UserID = ${req.params.ID}
            `
            db.query(strQry, (err, result) => {
                if (err) throw new Error('Our apologies, an issue seems to have occured whe retrieving this user. Please try again later.')
                    res.json({
                    status: res.statusCode,
                    result: result[0]
                })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: "Please try again later."
            })
        }
    }
    
}
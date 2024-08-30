import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/UserAuth.js";
import { compare, hash } from "bcrypt";

class Users {
    fetchUsers(req, res) {
        const strQry = `
            SELECT UserID, firstName, lastName, userAge, gender, userRole, emailAdd, userProfile, createdAt, updatedAt
            FROM Users;
        `
        db.query(strQry, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    msg: "An error occurred when retrieving users. Please try again later."
                })
            }
            res.json({
                status: 200,
                results
            })
        })
    }

    fetchUser(req, res) {
        const strQry = `
            SELECT UserID, firstName, lastName, userAge, gender, emailAdd, userProfile, createdAt, updatedAt
            FROM Users
            WHERE UserID = ?;
        `
        db.query(strQry, [req.params.ID], (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    msg: "An error occurred when retrieving the user. Please try again later."
                })
            }
            if (!result.length) {
                return res.status(404).json({
                    status: 404,
                    msg: "User not found."
                })
            }
            res.json({
                status: 200,
                result: result[0]
            })
        })
    }

    async registerUser(req, res) {
        try {
            let data = req.body;
            data.userPass = await hash(data.userPass, 10);

            const strQry = `
            INSERT INTO Users
            SET ?;
            `

            db.query(strQry, [data], (err, results) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({
                            status: 409,
                            msg: "Email is already registered. Please log in or choose a different email."
                        })
                    }
                    return res.status(500).json({
                        status: 500,
                        msg: "An error occurred during registration. Please try again."
                    })
                }
                const token = createToken({ emailAdd: data.emailAdd });
                res.json({
                    status: 201,
                    token,
                    msg: "Registration successful. Please log in to continue."
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: e.message
            })
        }
    }

    async updateUser(req, res) {
        try {
            let data = req.body;
            if (data.userPass) {
                data.userPass = await hash(data.userPass, 10);
            }
            const strQry = `
            UPDATE Users
            SET ?
            WHERE UserID = ?;
            `
            db.query(strQry, [data, req.params.ID], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        msg: "Error updating user information. Please try again later."
                    })
                }
                res.json({
                    status: 200,
                    msg: "User information successfully updated."
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: e.message
            })
        }
    }

    deleteUser(req, res) {
        const strQry = `
            DELETE FROM Users
            WHERE UserID = ?;
        `
        db.query(strQry, [req.params.ID], (err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 500,
                    msg: "Error deleting the user. Please try again later."
                })
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    status: 404,
                    msg: "User not found."
                })
            }
            res.json({
                status: 200,
                msg: "User successfully deleted."
            })
        })
    }

    async login(req, res) {
        try {
            const { emailAdd, userPass } = req.body;
            const strQry = `
            SELECT UserID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile, createdAt, updatedAt
            FROM Users
            WHERE emailAdd = ?;
            `
            db.query(strQry, [emailAdd], async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        msg: "An error occurred while logging in. Please try again."
                    })
                }
                if (!result.length) {
                    return res.status(401).json({
                        status: 401,
                        msg: "Invalid email or password."
                    })
                }

                const ValidPass = await compare(userPass, result[0].userPass);
                if (!ValidPass) {
                    return res.status(401).json({
                        status: 401,
                        msg: "Invalid email or password."
                    })
                }

                const token = createToken({
                    emailAdd: result[0].emailAdd,
                    userPass: result[0].userPass
                })

                res.json({
                    status: 200,
                    token,
                    user: {
                        UserID: result[0].UserID,
                        firstName: result[0].firstName,
                        lastName: result[0].lastName,
                        userRole: result[0].userRole,
                        emailAdd: result[0].emailAdd
                    }
                })
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                msg: e.message
            })
        }
    }
}

export {
     Users 
    }

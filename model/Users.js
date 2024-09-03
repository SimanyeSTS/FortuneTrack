import { connection as db } from "../config/index.js";
import { createToken } from "../middleware/UserAuth.js";
import { compare, hash } from "bcrypt";

class Users {
    async fetchUsers(req, res) {
        try {
            const strQry = `
                SELECT UserID, firstName, lastName, userAge, gender, userRole, emailAdd, userProfile, createdAt, updatedAt
                FROM Users;
            `
            const [results] = await db.execute(strQry)
            res.json({
                status: 200,
                results
            })
        } catch (err) {
            res.status(500).json({
                status: 500,
                msg: "An error occurred when retrieving users. Please try again later."
            })
        }
    }

    async fetchUser(req, res) {
        try {
            const strQry = `
                SELECT UserID, firstName, lastName, userAge, gender, emailAdd, userProfile, createdAt, updatedAt
                FROM Users
                WHERE UserID = ?;
            `
            const [result] = await db.execute(strQry, [req.params.ID])
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
        } catch (err) {
            res.status(500).json({
                status: 500,
                msg: "An error occurred when retrieving the user. Please try again later."
            })
        }
    }

    async registerUser(req, res) {
        try {
            let data = req.body
            data.userPass = await hash(data.userPass, 10)

            const strQry = `
            INSERT INTO Users
            SET ?;
            `
            const [results] = await db.execute(strQry, [data])
            const token = createToken({ emailAdd: data.emailAdd })
            res.json({
                status: 201,
                token,
                msg: "Registration successful. Please log in to continue."
            })
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    status: 409,
                    msg: "Email is already registered. Please log in or choose a different email."
                })
            }
            res.status(500).json({
                status: 500,
                msg: "An error occurred during registration. Please try again."
            })
        }
    }

    async updateUser(req, res) {
        try {
            let data = req.body
            if (data.userPass) {
                data.userPass = await hash(data.userPass, 10)
            }
            const strQry = `
            UPDATE Users
            SET ?
            WHERE UserID = ?;
            `
            await db.execute(strQry, [data, req.params.ID])
            res.json({
                status: 200,
                msg: "User information successfully updated."
            })
        } catch (err) {
            res.status(500).json({
                status: 500,
                msg: "Error updating user information. Please try again later."
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const strQry = `
                DELETE FROM Users
                WHERE UserID = ?;
            `
            const [result] = await db.execute(strQry, [req.params.ID])
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
        } catch (err) {
            res.status(500).json({
                status: 500,
                msg: "Error deleting the user. Please try again later."
            })
        }
    }

    async login(req, res) {
        try {
            const { emailAdd, userPass } = req.body
            const strQry = `
            SELECT UserID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile, createdAt, updatedAt
            FROM Users
            WHERE emailAdd = ?;
            `
            const [result] = await db.execute(strQry, [emailAdd])
            if (!result.length) {
                return res.status(401).json({
                    status: 401,
                    msg: "Invalid email or password."
                })
            }

            const ValidPass = await compare(userPass, result[0].userPass)
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
        } catch (err) {
            res.status(500).json({
                status: 500,
                msg: "An error occurred while logging in. Please try again."
            })
        }
    }
}

export {
    Users
}
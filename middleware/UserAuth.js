import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt

function createToken(user) {
    return sign(
        {
            userID: user.UserID,
            emailAdd: user.emailAdd
        },
        process.env.SECRET_KEY,
        { expiresIn: '10m' }
    )
}

function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            msg: "Access denied. No token provided. Please log in to continue to FortuneTrack."
        })
    }

    try {
        const decoded = verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                msg: "Session expired. Please log in again to continue to FortuneTrack."
            })
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                msg: "Invalid token. Please check your credentials or log in again."
            })
        } else {
            return res.status(500).json({
                msg: "Something went wrong with the authentication process. Please try again."
            })
        }
    }
}

export {
    createToken,
    verifyToken
}

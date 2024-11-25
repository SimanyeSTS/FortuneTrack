import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const { sign, verify } = jwt;

function createToken(user) {
  return sign(
    {
      userID: user.UserID,
      emailAdd: user.emailAdd
    },
    process.env.SECRET_KEY,
    { expiresIn: '45m' }
  );
}

function createRefreshToken(user) {
  return sign(
    {
      userID: user.UserID
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
}

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Invalid token format. Please log in again."
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        msg: "Session expired. Please log in again."
      });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        msg: "Invalid token. Please log in again."
      });
    } else {
      console.error(`Token verification failed: ${err.message}`);
      return res.status(500).json({
        msg: "Something went wrong during authentication. Please try again."
      });
    }
  }
}

function verifyRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      resolve(decoded);
    } catch (err) {
      reject(err);
    }
  });
}

export {
  createToken,
  createRefreshToken,
  verifyToken,
  verifyRefreshToken,
};

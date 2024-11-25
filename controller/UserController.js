import express from 'express';
import bodyParser from 'body-parser';
import { users } from '../model/index.js';
import { verifyRefreshToken, createToken } from '../middleware/UserAuth.js';

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/', async (req, res) => {
  try {
    const result = await users.fetchUsers()
    res.json({
      status: 200,
      results: result,
      message: result.length === 0 ? 'No users found' : ''
    })
  } catch (err) {
    res.status(500).json({ 
      status: 500, 
      results: [], 
      message: err.message 
    })
  }
})

userRouter.get('/:ID', async (req, res) => {
  try {
    const UserID = req.params.ID
    const result = await users.fetchUser(UserID)
    if (!result) {
      res.status(404).json({ 
        status: 404, 
        results: [], 
        message: `User not found with ID ${req.params.ID}` 
      })
    } else {
      res.json({
        status: 200,
        results: result,
        message: ''
      })
    }
  } catch (err) {
    res.status(404).json({ 
      status: 404, 
      results: [], 
      message: `User not found with ID ${req.params.ID}` 
    })
  }
})

userRouter.post('/register', async (req, res) => {
  try {
    const result = await users.registerUser(req.body)
    res.json({
      status: 201,
      results: result,
      message: 'User registered successfully'
    })
  } catch (err) {
    if (err.status === 409) {
      res.status(err.status).json({ 
        status: err.status, 
        results: [], 
        message: err.msg 
      })
    } else {
      res.status(500).json({ 
        status: 500, 
        results: [], 
        message: 'Error registering user' 
      })
    }
  }
})

userRouter.patch('/:ID', async (req, res) => {
  try {
    const UserID = req.params.ID
    const data = req.body
    const result = await users.updateUser(UserID, data)
    
    if (result.affectedRows === 0) {
      res.status(404).json({ 
        status: 404, 
        results: [], 
        message: `User not found with ID ${UserID}` 
      })
    } else {
      res.json({
        status: 200,
        results: result,
        message: 'User updated successfully'
      })
    }
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ 
        status: 409, 
        results: [], 
        message: "Email is already registered. Please log in or choose a different email." 
      })
    } else {
      res.status(500).json({ 
        status: 500, 
        results: [], 
        message: 'Error updating user' 
      })
    }
  }
})

userRouter.delete('/:ID', async (req, res) => {
  try {
    const UserID = req.params.ID
    const result = await users.deleteUser(UserID)
    
    if (!result) {
      res.status(404).json({ 
        status: 404, 
        results: [], 
        message: `User not found with ID ${UserID}` 
      })
    } else {
      res.json({
        status: 200,
        results: [],
        message: 'User deleted successfully'
      })
    }
  } catch (err) {
    res.status(404).json({ 
      status: 404, 
      results: [], 
      message: `User not found with ID ${UserID}` 
    })
  }
})

userRouter.post('/login', async (req, res) => {
  try {
    const result = await users.loginUser(req.body)
    res.json({
      status: 200,
      results: result,
      message: 'Login successful'
    })
  } catch (err) {
    res.status(401).json({ 
      status: 401, 
      results: [], 
      message: 'Invalid credentials' 
    })
  }
})

userRouter.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ status: 400, message: 'Refresh token is required' })
  }
  res.json({ status: 200, message: 'Logged out successfully. Token will expire naturally.' })
})


userRouter.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ status: 400, message: 'Refresh token is required' });
    }

    const decoded = await verifyRefreshToken(refreshToken);
    const newToken = createToken({ userID: decoded.userID });

    res.json({
      status: 200,
      token: newToken,
      message: 'Token refreshed successfully',
    })
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ status: 403, message: 'Refresh token expired. Please log in again.' });
    }
    return res.status(401).json({ status: 401, message: 'Invalid refresh token' })
  }
})

export { 
  userRouter 
}
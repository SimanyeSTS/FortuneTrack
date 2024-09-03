import express from 'express';
import bodyParser from 'body-parser';
import { users } from '../model/index.js';

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/', async (req, res) => {
  try {
    await users.fetchUsers(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

userRouter.get('/:ID', async (req, res) => {
  try {
    await users.fetchUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: `User not found with ID ${req.params.ID}` });
  }
});

userRouter.post('/register', async (req, res) => {
  try {
    await users.registerUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering user' });
  }
});

userRouter.patch('/:ID', async (req, res) => {
  try {
    await users.updateUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: `User not found with ID ${req.params.ID}` });
  }
});

userRouter.delete('/:ID', async (req, res) => {
  try {
    await users.deleteUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: `User not found with ID ${req.params.ID}` });
  }
});

userRouter.post('/login', async (req, res) => {
  try {
    await users.loginUser(req, res);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

export {
  userRouter
}
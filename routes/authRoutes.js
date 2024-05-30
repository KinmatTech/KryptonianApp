import express from 'express';
import { register, login, confirmEmail } from '../controllers/authController.js';

const router = express.Router();

// Define your routes here
router.post('/register', register);
router.post('/login', login);
router.get('/confirm-email', confirmEmail);

export default router;

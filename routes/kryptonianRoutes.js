import express from 'express';
import Kryptonian from '../models/Kryptonian.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const newKryptonian = new Kryptonian({ email, password });
        await newKryptonian.save();
        res.status(201).send('Kryptonian registered successfully');
    } catch (error) {
        res.status(500).send('Error registering Kryptonian: ' + error.message);
    }
});

export default router;
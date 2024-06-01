import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { register, login, confirmEmail } from './controllers/kryptonianController.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Kryptonian App: Developed by Okechukwu Ani"));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.post('/register', register);
app.post('/login', login);
app.get('/confirm-email', confirmEmail);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

import Kryptonian from '../models/Kryptonian.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { jwtSecret, emailUser, emailPass } from '../config.js';
import nodemailer from 'nodemailer';
import redis from 'redis';

// Initialize Redis client
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

// Function to register a new Kryptonian
export const register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newKryptonian = new Kryptonian({ email, password: hashedPassword });
        await newKryptonian.save();

        // Generate email confirmation token
        const emailToken = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });
        const confirmationUrl = `http://localhost:3000/confirm-email?token=${emailToken}`;

        // Store token in Redis
        redisClient.set(email, emailToken, 'EX', 3600);

        // Send confirmation email
        const mailOptions = {
            from: emailUser,
            to: email,
            subject: 'Confirm Your Email',
            text: `Please confirm your email by clicking the following link: ${confirmationUrl}`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).send('Kryptonian registered successfully. Please check your email to confirm your account.');
    } catch (error) {
        res.status(500).send('Error registering Kryptonian: ' + error.message);
    }
};

// Function to handle login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const kryptonian = await Kryptonian.findOne({ email });
        if (!kryptonian) {
            return res.status(404).send('Kryptonian not found');
        }

        const isPasswordValid = await bcrypt.compare(password, kryptonian.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: kryptonian._id, email: kryptonian.email }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send('Error logging in: ' + error.message);
    }
};

// Function to confirm email
export const confirmEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const { email } = decoded;

        redisClient.get(email, (err, redisToken) => {
            if (err || redisToken !== token) {
                return res.status(400).send('Invalid or expired token');
            }

            Kryptonian.findOneAndUpdate({ email }, { confirmed: true }, (err, kryptonian) => {
                if (err || !kryptonian) {
                    return res.status(500).send('Error confirming email');
                }

                redisClient.del(email);
                res.status(200).send('Email confirmed successfully');
            });
        });
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};
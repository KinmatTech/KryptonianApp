import crypto from 'crypto';
import multer from 'multer';
import base64Img from 'base64-img';
import fs from 'fs';
import path from 'path';
import Kryptonian from '../models/Kryptonian.js';
import Image from '../models/Image.js';
import router from '../routes/authRoutes.js';

export const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const generateApiKey = async (req, res) => {
    try {
        const email = req.user.email;
        const user = await Kryptonian.findOne({ email });

        if (!user.apiKey) {
            user.apiKey = crypto.randomBytes(16).toString('hex');
            await user.save();
        }

        res.status(200).json({ apiKey: user.apiKey });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const uploadFile = upload.single('file');

export const handleUpload = async (req, res) => {
    try {
        const apiKey = req.headers['api-key'];
        const user = await Kryptonian.findOne({ apiKey });

        if (!user) {
            return res.status(401).json({ message: 'Invalid API Key' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({ message: 'Allowed file types are png, jpg, jpeg, gif' });
        }

        const base64String = req.file.buffer.toString('base64');
        const filename = req.file.originalname;
        
        const image = new Image({ filename, data: base64String, kryptonian: user._id });
        await image.save();

        user.images.push(image._id);
        await user.save();

        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default router = { generateApiKey, uploadFile, handleUpload };

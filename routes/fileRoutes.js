import express from "express";
import { 
    generateApiKey, 
    uploadFile, 
    handleUpload

} from "../controllers/fileController.js";

import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate_api_key', authenticate, generateApiKey);
router.post('/upload', uploadFile, handleUpload);

export default router;
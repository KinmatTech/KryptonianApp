import dotenv from 'dotenv';

dotenv.config();

export const mongoURI = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const emailUser = process.env.EMAIL_USER;
export const emailPass = process.env.EMAIL_PASS;
export const redisHost = process.env.REDIS_HOST;
export const redisPort = process.env.REDIS_PORT;
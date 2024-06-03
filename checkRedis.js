import redis from 'redis';

// Initialize Redis client with environment variables or default values
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'locahost',
    port: process.env.REDIS_PORT || 6379,
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

// Connect to Redis server
redisClient.connect().catch(console.error);

export default redisClient;
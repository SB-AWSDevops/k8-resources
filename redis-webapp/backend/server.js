const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 3000;

// Redis client setup
const client = redis.createClient({
    host: process.env.REDIS_HOST || 'redis-service', // Redis service name or hostname
    port: process.env.REDIS_PORT || 6379
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(morgan('combined')); // Log HTTP requests

// Set value in Redis
app.post('/set', (req, res) => {
    const { key, value } = req.body;
    
    if (!key || !value) {
        return res.status(400).send('Key and value are required');
    }

    client.set(key, value, (err) => {
        if (err) return res.status(500).send('Error setting value');
        res.send('Value set successfully');
    });
});

// Get value from Redis
app.get('/get', (req, res) => {
    const { key } = req.query;

    if (!key) {
        return res.status(400).send('Key is required');
    }

    client.get(key, (err, value) => {
        if (err) return res.status(500).send('Error getting value');
        res.send(value || 'Key not found');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

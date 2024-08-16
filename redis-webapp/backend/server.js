const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const client = redis.createClient({
    host: 'redis-service', // Redis service name
    port: 6379
});

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/set', (req, res) => {
    const { key, value } = req.body;
    client.set(key, value, (err) => {
        if (err) return res.status(500).send('Error setting value');
        res.send('Value set successfully');
    });
});

app.get('/get', (req, res) => {
    const { key } = req.query;
    client.get(key, (err, value) => {
        if (err) return res.status(500).send('Error getting value');
        res.send(value || 'Key not found');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

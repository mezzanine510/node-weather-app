const express = require('express');

const port = process.env.PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, express!');
});

app.get('/help', (req, res) => {
    res.send('Help page.');
});

app.get('/about', (req, res) => {
    res.send('About page.');
});

app.get('/weather', (req, res) => {
    res.send('Weather page.');
});

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is running!');
});
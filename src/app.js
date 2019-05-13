const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('Hello, express!');
});

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is running!');
});
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT = 8081;

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars/hbs engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use( express.static(publicDirectoryPath) );



//*** PAGES ***//

// Index/Home
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nahuel Ruda'
    });
});

// About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nahuel Ruda'
    });
});

// Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        details: 'This is the help page.',
        name: 'Nahuel Ruda'
    });
});

// Weather
app.get('/weather', (req, res) => {
    const address = req.query.address ? req.query.address : undefined;
    if (!address) {
        return res.send({
            error: 'Please enter an address'
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            
            res.send({
                forecast: forecastData,
                location,
                address
            })
        });
    });

    // res.send({
    //     forecast: 'Sunny as fuck',
    //     location: 'San Francisco',
    //     address: req.query.address
    // });
});

// Products
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    
    console.log(req.query.search);
    res.send({ products: [] });
});

// 404 related to /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nahuel Ruda',
        errorMessage: 'Help article was not found.'
    });
});

// 404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nahuel Ruda',
        errorMessage: 'Page was not found.'
    });
});



//*** START SERVER ***//
app.listen(port, () => {
    console.log( chalk.cyan('Server is up on port'), chalk.yellow(port) );
});
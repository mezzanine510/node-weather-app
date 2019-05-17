const request = require('request');

// provide your Dark Sky token/api key to use the app
const { darkskyKey } = require('./my-config');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${ darkskyKey }/${ latitude },${ longitude }`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            const temperature = body.currently.temperature;
            const windSpeed = body.currently.windSpeed;
            const todaySummary = body.daily.data[0].summary;

            callback(undefined, 
                {
                    temperature,
                    summary: `${ todaySummary } It is currently ${ temperature } degrees out. The current wind speed is ${ windSpeed }mph.`
                }
            );
        }
    });
}

module.exports = forecast;
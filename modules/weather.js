'use strict';

const axios = require('axios');
const cache = require('../cache');

function getWeather(req, res, next) {
  let city = req.query.searchQuery;
  const key = 'weather ' + city;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&days=10`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 240000)) {
    console.log('Weather Cache Hit');
    res.status(200).send(cache[key].data);
  } else {
    console.log('Weather Cache Miss');
    axios.get(weatherUrl)
      .then(response => response.data.data.map(day => new Forecast(day)))
      .then(formattedData => {
        cache[key] = {
          timestamp: Date.now(),
          data: formattedData
        };
        res.status(200).send(formattedData);
      })
      .catch(error => next(error));
  }
}

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;

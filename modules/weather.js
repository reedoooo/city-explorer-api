'use strict';

const axios = require('axios');
const cache = require('../cache');

function getWeather(req, res, next) {

  let searchInput = req.query.searchQuery;
  const key = 'weather ' + searchInput;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchInput}&key=${process.env.REACT_APP_WEATHER_KEY}&days=10`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 240000)) {
    console.log('Weather Cache Hit');
    res.status(200).send(cache[key].data);
  }
  else {
    console.log('Weather Cache Miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
  }
  axios.get(weatherUrl)
    .then(response => response.data.data.map(day => new Forecast(day)))
    // saves cache data in formatted data and send it
    .then(formattedData => {
      cache[key].data = formattedData;
      res.status(200).send(formattedData);
    })
    .catch(error => next(error));
}

// create a weather class so we can store the information in it. //
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports = getWeather;

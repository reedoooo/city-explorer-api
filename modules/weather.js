'use strict';

const axios = require('axios');
const cache = require('../cache');

function getWeather(req, res, next) {

  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_KEY;
  let locationResults = req.query.searchQuery;
  const key = 'weather ' + locationResults;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${locationResults}&key=${WEATHER_API_KEY}&days=10`;

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

// OLD WAY BEFORE REFACTORING

// app.get('/weather', async (req, res) => {
//   let city = req.query.searchQuery;

//   let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&days=10`;
//   console.log(response.data);
//   // response to get the live weather data //
//   let response = await axios.get(weatherUrl);
//   // we feed the weather data to our Forecast class //
//   let liveInfo = response.data.data.map(day => new Forecast(day));
//   // we send out the data
//   res.status(200).send(liveInfo);
// });


module.exports = getWeather;

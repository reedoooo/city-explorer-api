'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.get('/weather', getWeather);
app.get('/movies', getMovies);

// const PORT = process.env.PORT || 8080;

// const location = require('./modules/location');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');


// app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Your default endpoint is working');
});

app.listen(process.env.PORT, () =>
  console.log(`Server up on ${process.env.PORT}`)
);

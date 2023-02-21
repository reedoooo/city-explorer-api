'use strict';

require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3002;


const location = require('./modules/location');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

app.use(express.static('public'));



app.get('/location', location.locationHandler);
app.get('/weather', getWeather);
app.get('/movies', getMovies);

// send index.html as the root page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

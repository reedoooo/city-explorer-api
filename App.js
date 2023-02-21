// Import the necessary modules.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const axios = require('axios');
const path = require('./public/main');

// Create a new Express app.
const app = express();
app.use(express.json());
app.use(express.static('public'));

// Set up the middleware.
app.use(cors());
const PORT = process.env.PORT || 3002;

app.get('/main', path);

// Set up the routes.
app.get('/', (req, res) => {
  res.send('Hello from my server');
});

app.post('/', async (req, res) => {
  const ACCESS_TOKEN_LOCATION = process.env.LOCATION_KEY;
  const ACCESS_TOKEN_WEATHER = process.env.WEATHER_KEY;
  const searchQuery = req.body.searchQuery;

  try {
    const locationRequest = await axios.get(`https://us1.locationiq.com/v1/search?key=${ACCESS_TOKEN_LOCATION}&q=${searchQuery}&format=json`);

    const lat = locationRequest.data[0].lat;
    const lon = locationRequest.data[0].lon;

    const weatherRequest = await axios.get(`http://api.weatherbit.io/v2.0/subscription/usage?key=${ACCESS_TOKEN_WEATHER}&lat=${lat}&lon=${lon}&format=json`);

    res.render('index', {
      condition: true,
      locationResults: locationRequest.data,
      weatherResults: weatherRequest.data
    });

  } catch (e) {
    console.log(e);
    res.render('index', { condition: false, error: e.message });
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

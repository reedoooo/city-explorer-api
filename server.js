'use strict';

const express = require('express');

require('dotenv').config();

const app = express();

const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 8080;


// const location = require('./modules/location');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

// app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Your default endpoint is working');
});

// send index.html as the root page
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/location', location.locationHandler);
app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

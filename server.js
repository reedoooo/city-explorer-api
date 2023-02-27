"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const getWeather = require("./modules/weather");
const getMovies = require("./modules/movies");
const getYelp = require("./modules/yelp");

app.use(cors());

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://newestbranch--reedthahuman-city-explorer.netlify.app"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/weather", getWeather);
app.get("/movies", getMovies);
app.get("/yelp", getYelp);

app.get("/", (request, response) => {
  response.send("Your default endpoint is working");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server up on ${PORT}`));

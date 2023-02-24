"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const getWeather = require("./modules/weather");
const getMovies = require("./modules/movies");

const app = express();

app.use(cors());
app.get("/weather", getWeather);
app.get("/movies", getMovies);

app.get("/", (request, response) => {
  response.send("Your default endpoint is working");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server up on ${PORT}`));

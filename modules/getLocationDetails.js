'use strict';

const axios = require('axios');

function getLocationDetails(locations) {
  const promises = locations.map(location => {
    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${location.lat}&lon=${location.lon}&key=${process.env.WEATHER_API_KEY}`;
    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location.name}`;

    const weatherPromise = axios.get(weatherURL);
    const moviePromise = axios.get(movieURL);

    return Promise.all([weatherPromise, moviePromise])
      .then(responses => {
        const weatherData = responses[0].data.data;
        const movieData = responses[1].data.results;
        const locationDetails = new LocationDetails(location, weatherData, movieData);
        return locationDetails;
      });
  });

  return Promise.all(promises);
}

class LocationDetails {
  constructor(location, weatherData, movieData) {
    this.name = location.name;
    this.lat = location.lat;
    this.lon = location.lon;
    this.image = location.image;
    this.weather = weatherData.map(day => new Weather(day));
    this.movies = movieData.map(movie => new Movie(movie));
  }
}

class Weather {
  constructor(weatherData) {
    this.forecast = weatherData.weather.description;
    this.time = new Date(weatherData.valid_date).toDateString();
  }
}

class Movie {
  constructor(movieData) {
    this.title = movieData.title;
    this.overview = movieData.overview;
    this.average_votes = movieData.vote_average;
    this.total_votes = movieData.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
    this.popularity = movieData.popularity;
    this.released_on = movieData.release_date;
  }
}

module.exports = getLocationDetails;

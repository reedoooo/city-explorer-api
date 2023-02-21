'use strict';

const axios = require('axios');
const getLocationDetails = require('./getLocationDetails');

function locationHandler(req, res, next) {
  const searchQuery = req.query.searchQuery;
  const locationURL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_API_KEY}&q=${searchQuery}&format=json`;

  axios.get(locationURL)
    .then(response => {
      const locations = response.data.map(location => new Locations(location));
      return getLocationDetails(locations);
    })
    .then(locationDetails => {
      res.status(200).json(locationDetails);
    })
    .catch(error => next(error));
}

class Locations {
  constructor(location) {
    this.name = location.display_name;
    this.lat = location.lat;
    this.lon = location.lon;
    this.image = `https://maps.locationiq.com/v3/staticmap?key=${process.env.LOCATION_API_KEY}&center=${location.lat},${location.lon}&zoom=10`;
  }
}

module.exports = {
  locationHandler
};

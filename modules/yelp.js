"use strict";

const axios = require("axios").default;
const yelpKey = process.env.REACT_APP_YELP_KEY;

//class
function getYelp(req, res, next) {
  let yelp = req.query.searchQuery;
  let yelpUrl = `https://api.yelp.com/v3/business/search/api_key=${process.env.REACT_APP_YELP_KEY}&query=${yelp}`;

  axios
    .get(yelpUrl)
    .then((response) => {
      let liveInfo = response.data.results.map((yelp) => new Yelp(yelp));
      res.status(200).send(liveInfo);
    })
    .catch((error) => next(error));

}

class Yelp {
  constructor(yelp) {
    this.name = yelp.name;
    this.image_url = yelp.image_url;
    this.price = yelp.price;
    this.rating = yelp.rating;
    this.url = yelp.url;
  }
}

module.exports = getYelp;

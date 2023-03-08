const functions = require("firebase-functions");

//Serp api replacement

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const linkedInSearchString = 'site:linkedin.com inurl:in OR inurl:pub -inurl:dir ';

const indexOfJobTitle=2;
const indexOfCity=0;
const indexOfInstitute=1;
const indexOfKeywords=3;

var PROD_API_KEY = 'b00848a4ed5f2abdff3ddae57d07c5e5acc38ee1a7863780d030de13f4bb3570';

const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch(PROD_API_KEY);


app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);

  // Extract the query parameters from the request
  const { q } = req.query;
  const searchQuery = linkedInSearchString.concat(q[indexOfJobTitle], ' AND ', '("', q[indexOfKeywords], '")', ' AND ', '"', q[indexOfCity], '"', ' AND ', '"', q[indexOfInstitute], '"');

  const params = {
    engine: "google",
    q: searchQuery,
  };


  const callback = function (data) {
    res.send(data);
  };

  // Show result as JSON
  search.json(params, callback);
});

exports.app = functions.https.onRequest(app);

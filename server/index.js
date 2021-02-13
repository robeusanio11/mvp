const express = require('express');
const app = express();
const path = require('path');
const API_KEY = require('./api_key.js')
const {
  getMatchStats
} = require('./controllers.js')
const bodyParser = require('body-parser');

const PORT = 1111;

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/summonerStats', getMatchStats);

app.listen(PORT, () => { console.log('Server listening on port:', PORT) });
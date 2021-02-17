const express = require('express');
const app = express();
const path = require('path');
const API_KEY = require('./apiKey.js')
const {
  getMatchStats,
  getPreviouslySearched
} = require('./controllers.js')
const bodyParser = require('body-parser');
require('../database/index.js');
const { SearchHistory } = require('../database/Model.js');

const PORT = 1111;

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/summonerStats', getMatchStats);

app.get('/previouslySearched', getPreviouslySearched);



app.get('/delete', (req, res) => {
  return SearchHistory.deleteOne({
    summoner: 'Bjergson'
  })
    .then(async () => {
      await SearchHistory.find({})
        .then((results) => {
          console.log(results);
        })
    })
})

app.listen(PORT, () => { console.log('Server listening on port:', PORT) });
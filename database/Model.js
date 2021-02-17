const mongoose = require('mongoose');

const searchHistorySchema = mongoose.Schema({
  summoner: String,
  matches: [
    {
      id: Number,
      kills: Number,
      deaths: Number,
      assists: Number,
    }
  ],
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = {
  SearchHistory: SearchHistory,
};
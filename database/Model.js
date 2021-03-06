const mongoose = require('mongoose');

const searchHistorySchema = mongoose.Schema({
  summoner: String,
  matches: {
    kda: [
      {
        id: Number,
        kills: Number,
        deaths: Number,
        assists: Number,
      }
    ],
    damageDealt: [
      {
        id: Number,
        totalDamageDealt: Number,
        magicDamageDealt: Number,
        physicalDamageDealt: Number,
      }
    ],
    damageTaken: [
      {
        id: Number,
        totalDamageTaken: Number,
        magicalDamageTaken: Number,
        physicalDamageTaken: Number,
      }
    ]
  }
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = {
  SearchHistory: SearchHistory,
};
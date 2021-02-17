const axios = require('axios');
const API_KEY = require('./apiKey.js');
const { SearchHistory } = require('../database/Model.js');

const getMatchStats = async (req, res) => {
  const { summoner } = req.query;
  const matchStats = {
    kda: [],
    damageDealt: [],
    damageTaken: [],
  };

  // Gets accountId of provided summoner
  await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${API_KEY}`)
    .then(async ({ data }) => {
      const { accountId } = data;
      // Gets last 10 matchIds
      await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${API_KEY}`)
        .then(async ({ data }) => {
          const { matches } = data;
          // Loops through last 10 matches
          for (var [index, { gameId }] of matches.entries()) {
            // Gets stats for each match
            await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${API_KEY}`)
              .then(({ data }) => {
                const { participants, participantIdentities } = data;
                // Finds participantId of provided summoner
                for (let participant of participantIdentities) {
                  if (accountId === participant.player.accountId) {
                    var myId = participant.participantId;
                    break;
                  }
                }
                // Adds stats to matchStats array
                participants.forEach(({ participantId, stats, timeline }) => {
                  if (myId === participantId) {
                    const {
                      kills,
                      deaths,
                      assists,
                      totalDamageDealt,
                      magicDamageDealt,
                      physicalDamageDealt,
                      totalDamageTaken,
                      magicalDamageTaken,
                      physicalDamageTaken,
                    } = stats;
                    matchStats.kda.push({
                      id: index + 1,
                      kills,
                      deaths,
                      assists,
                    });
                    matchStats.damageDealt.push({
                      id: index + 1,
                      totalDamageDealt,
                      magicDamageDealt,
                      physicalDamageDealt,
                    });
                    matchStats.damageTaken.push({
                      id: index + 1,
                      totalDamageTaken,
                      magicalDamageTaken,
                      physicalDamageTaken,
                    });
                  }
                });
              })
              .catch((err) => { console.error(err) });
          }
        })
        .catch((err) => { console.error(err) });
    })
    .catch((err) => { console.error(err) });

  await SearchHistory.findOneAndUpdate(
  // Where clause
  { summoner, },
  // New data
  {
    summoner,
    matches: matchStats,
  },
  // Options
  {
    upsert: true,
    useFindAndModify: false
  })
    .catch((err) => {
      console.error(err);
    })

  // Sends stats from last 10 matches
  res.send(matchStats)
};

const getPreviouslySearched = (req, res) => {
  return SearchHistory.find({})
    .then((results) => {
      res.send(results)
    })
    .catch((err) => { console.error(err); })
};

module.exports = {
  getMatchStats,
  getPreviouslySearched,
}

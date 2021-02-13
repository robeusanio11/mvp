const axios = require('axios');
const API_KEY = require('./api_key.js');

const getMatchStats = async (req, res) => {
  const { summoner } = req.query;
  const matchStats = [];

  // Gets accountId of provided summoner
  await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${API_KEY}`)
    .then(async ({ data }) => {
      const { accountId } = data;
      // Gets last 10 matchIds
      await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=10&api_key=${API_KEY}`)
        .then(async ({ data }) => {
          const { matches } = data;
          // Loops through last 10 matches
          for (var { gameId } of matches) {
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
                participants.forEach(({ participantId, stats }) => {
                  if (myId === participantId) {
                    matchStats.push(stats);
                  }
                });
              })
              .catch((err) => { console.error(err) });
          }
        })
        .catch((err) => { console.error(err) });
    })
    .catch((err) => { console.error(err) });
  // Sends stats from last 10 matches
  res.send(matchStats)
}

module.exports = {
  getMatchStats: getMatchStats,
}
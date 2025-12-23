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

  try {
    // API key must be sent in header, not query param
    const headers = { 'X-Riot-Token': API_KEY };

    // Parse Riot ID (format: GameName#TagLine)
    const riotIdParts = summoner.split('#');
    console.log('Parsing Riot ID:', summoner, '-> Parts:', riotIdParts);

    if (riotIdParts.length !== 2) {
      return res.status(400).json({
        error: `Invalid Riot ID format. Please use: GameName#TagLine (e.g., "Doublelift#NA1")`,
        example: 'Doublelift#NA1',
        received: summoner
      });
    }

    const [gameName, tagLine] = riotIdParts;
    console.log(`Fetching PUUID for: ${gameName}#${tagLine}`);

    // Gets PUUID using Riot ID endpoint
    const accountData = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`, { headers });
    const { puuid } = accountData.data;
    console.log('Got PUUID:', puuid);

    // Gets last 10 matchIds using Match-V5 API
    console.log('Fetching match IDs...');
    const matchList = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`, { headers });
    const matchIds = matchList.data;
    console.log(`Found ${matchIds.length} matches:`, matchIds);

    // Loops through last 10 matches
    for (let [index, matchId] of matchIds.entries()) {
      try {
        console.log(`Fetching match ${index + 1}/${matchIds.length}: ${matchId}`);
        // Gets stats for each match using Match-V5 API
        const matchData = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`, { headers });
        const { info } = matchData.data;

        // Finds participant data for the summoner using PUUID
        const participant = info.participants.find(p => p.puuid === puuid);

        if (participant) {
          const {
            kills,
            deaths,
            assists,
            totalDamageDealtToChampions,
            magicDamageDealtToChampions,
            physicalDamageDealtToChampions,
            totalDamageTaken,
            magicDamageTaken,
            physicalDamageTaken,
          } = participant;

          console.log(`Match ${index + 1} stats - K/D/A: ${kills}/${deaths}/${assists}`);

          matchStats.kda.push({
            id: index + 1,
            kills,
            deaths,
            assists,
          });
          matchStats.damageDealt.push({
            id: index + 1,
            totalDamageDealt: totalDamageDealtToChampions,
            magicDamageDealt: magicDamageDealtToChampions,
            physicalDamageDealt: physicalDamageDealtToChampions,
          });
          matchStats.damageTaken.push({
            id: index + 1,
            totalDamageTaken,
            magicalDamageTaken: magicDamageTaken,
            physicalDamageTaken,
          });
        } else {
          console.warn(`Participant not found in match ${matchId}`);
        }
      } catch (err) {
        console.error(`Error fetching match ${matchId}:`, err.message);
      }
    }

    console.log('Final match stats:', {
      kdaCount: matchStats.kda.length,
      damageDealtCount: matchStats.damageDealt.length,
      damageTakenCount: matchStats.damageTaken.length
    });
  } catch (err) {
    console.error('API Error:', err.response?.data || err.message);
    console.error('Request URL:', err.config?.url);
    console.error('Status Code:', err.response?.status);

    let errorMessage = 'Failed to fetch summoner data';
    if (err.response?.status === 403) {
      errorMessage = 'Access forbidden. Possible reasons: Invalid API key, rate limit exceeded, or incorrect region.';
    } else if (err.response?.status === 404) {
      errorMessage = 'Summoner not found. Check the summoner name spelling.';
    }

    return res.status(err.response?.status || 500).json({
      error: errorMessage,
      details: err.response?.data || err.message,
      statusCode: err.response?.status
    });
  }

  // Send response immediately - don't wait for database
  res.send(matchStats);

  // Save to database asynchronously (non-blocking, optional)
  SearchHistory.findOneAndUpdate(
    { summoner },
    { summoner, matches: matchStats },
    { upsert: true, useFindAndModify: false }
  ).catch((err) => {
    console.warn('Database save failed (non-critical):', err.message);
  });
};

const getPreviouslySearched = (req, res) => {
  return SearchHistory.find({})
    .then((results) => {
      res.send(results)
    })
    .catch((err) => { console.error(err); })
};

const getPreviousStats = (req, res) => {
  const { summoner } = req.query;
  return SearchHistory.find({
    summoner,
  })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => { console.error(err); })
}

module.exports = {
  getMatchStats,
  getPreviouslySearched,
  getPreviousStats,
}

import React, { useState } from 'react';

import Statistics from './Statistics';
import Graph from './Graph';
// import PreviouslySearched from './PreviouslySearched';
import Searchbar from './Searchbar';
import Header from './Header';

import axios from 'axios';

const RANKS = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'GrandMaster', 'Challenger'];
const VIEWS = [
  { value: 'kda', label: 'KDA' },
  { value: 'damageDealt', label: 'Damage' },
  { value: 'damageTaken', label: 'Defense' }
];

const App = ({ KdaAverages }) => {
  const [kda, setKda] = useState([]);
  const [damageDealt, setDamageDealt] = useState([]);
  const [damageTaken, setDamageTaken] = useState([]);
  const [view, setView] = useState('kda');
  const [currRank, setCurrRank] = useState(0);

  const searchSummoner = (summoner) => {
    axios.get(`/summonerStats?summoner=${encodeURIComponent(summoner)}`)
      .then(({ data }) => {
        console.log('Received data:', data);
        const { kda, damageDealt, damageTaken } = data;
        console.log('Setting state - kda:', kda, 'damageDealt:', damageDealt, 'damageTaken:', damageTaken);
        setKda(kda);
        setDamageDealt(damageDealt);
        setDamageTaken(damageTaken);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.error || 'Failed to fetch summoner stats';
        alert(errorMsg);
        console.error('Error:', err.response?.data || err.message);
      });
  };

  // const getSummoner = (summoner) => {
  //   axios.get(`/previousStats?summoner=${encodeURIComponent(summoner)}`)
  //     .then(({ data }) => {
  //       console.log('Previous data:', data);
  //       if (data[0]) {
  //         const { kda, damageDealt, damageTaken } = data[0].matches;
  //         setKda(kda);
  //         setDamageDealt(damageDealt);
  //         setDamageTaken(damageTaken);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('Error fetching previous stats:', err.message);
  //     });
  // };

  const changeView = (event) => {
    event.preventDefault();
    setView(event.target.value);
  };

  const handleSetCurrRank = (event) => {
    event.preventDefault();
    setCurrRank(Number(event.target.value));
  };

  console.log('Rendering - kda length:', kda.length, 'view:', view);

  return (
    <div className="app">
      <Header />

      <div className="searchBar">
        <Searchbar searchSummoner={searchSummoner} />
      </div>

      <div className="controlsContainer">
        <div className="viewButtons">
          <label>Stats:</label>
          <div>
            {VIEWS.map(({ value, label }) => (
              <button key={value} value={value} onClick={changeView}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="rankButtons">
          <label>Averages:</label>
          <div>
            {RANKS.map((rank, index) => (
              <button key={rank} value={index} onClick={handleSetCurrRank}>
                {rank}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Statistics
        kda={kda}
        damageDealt={damageDealt}
        damageTaken={damageTaken}
        view={view}
      />
      <Graph
        view={view}
        kda={kda}
        damageDealt={damageDealt}
        damageTaken={damageTaken}
        KdaAverage={KdaAverages[currRank]}
      />
      {/* <PreviouslySearched getSummoner={getSummoner}/> */}
    </div>
  );
};

export default App;
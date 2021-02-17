import React from 'react';
import GameStats from './GameStats.jsx';

const Statistics = ({ matches }) => (
  <div className="statistics">
    <ul>
      {matches.map((match) => (
        <GameStats
          id={match.id}
          kills={match.kills}
          deaths={match.deaths}
          assists={match.assists}
        />
      ))}
    </ul>
  </div>
);

export default Statistics;
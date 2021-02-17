import React from 'react';
import KdaStats from './KdaStats.jsx';
import DamageStats from './DamageStats.jsx';
import DefenseStats from './DefenseStats.jsx'

const Statistics = ({ kda, damageDealt, damageTaken, view }) => {
  if (view === 'kda') {
    return (
      <div className="statistics">
        <ul>
          {kda.map((match) => (
            <KdaStats
              id={match.id}
              kills={match.kills}
              deaths={match.deaths}
              assists={match.assists}
            />
          ))}
        </ul>
      </div>
    );
  } else if (view === 'damageDealt') {
    return (
      <div className="statistics">
        <ul>
          {damageDealt.map((match) => (
            <DamageStats
              id={match.id}
              totalDamageDealt={match.totalDamageDealt}
              magicDamageDealt={match.magicDamageDealt}
              physicalDamageDealt={match.physicalDamageDealt}
            />
          ))}
        </ul>
      </div>
    );
  } else if (view === 'damageTaken') {
    return (
      <div className="statistics">
        <ul>
          {damageTaken.map((match) => (
            <DefenseStats
              id={match.id}
              totalDamageTaken={match.totalDamageTaken}
              magicalDamageTaken={match.magicalDamageTaken}
              physicalDamageTaken={match.physicalDamageTaken}
            />
          ))}
        </ul>
      </div>
    );
  }
};

export default Statistics;
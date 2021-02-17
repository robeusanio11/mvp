import React from 'react';

const DefenseStats = ({ id, totalDamageTaken, magicalDamageTaken, physicalDamageTaken }) => (
  <div>
    <h3>Game {id} of 10</h3>
    <div>Total Damage Taken: {totalDamageTaken}</div>
    <div>Magic Damage Taken: {magicalDamageTaken}</div>
    <div>Physical Damage Taken: {physicalDamageTaken}</div>
  </div>
);

export default DefenseStats;
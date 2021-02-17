import React from 'react';

const DamageStats = ({ id, totalDamageDealt, magicDamageDealt, physicalDamageDealt }) => (
  <div>
    <h3>Game {id} of 10</h3>
    <div>Total Damage Dealt: {totalDamageDealt}</div>
    <div>Magic Damage Dealt: {magicDamageDealt}</div>
    <div>Physical Damage Dealt: {physicalDamageDealt}</div>
  </div>
);

export default DamageStats;
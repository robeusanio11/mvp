import React from 'react';

const GameStats = ({ id, kills, deaths, assists }) => (
  <div>
    <h3>Game {id} of 10</h3>
    <div>Kills: {kills}</div>
    <div>Deaths: {deaths}</div>
    <div>Assists: {assists}</div>
  </div>
);

export default GameStats;
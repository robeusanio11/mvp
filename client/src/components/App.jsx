import React, { useState, useEffect } from 'react';

import Statistics from './Statistics';
import Graph from './Graph';
import PreviouslySearched from './PreviouslySearched';
import Searchbar from './Searchbar';

const App = () => {
  const [currPlayerData, setCurrPlayerData] = useState(null);

  return (
    <div className="app">
      <Statistics />
      <Searchbar />
      <Graph />
      <PreviouslySearched />
    </div>
  )
};

export default App;
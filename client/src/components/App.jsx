import React, { useState, useEffect } from 'react';

import Statistics from './Statistics';
import Graph from './Graph';
import PreviouslySearched from './PreviouslySearched';
import Searchbar from './Searchbar';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      matches: [],
    };

    this.getStatistics = this.getStatistics.bind(this);
    this.searchSummoner = this.searchSummoner.bind(this);
  }

  componentDidMount() {
    this.getStatistics();
  }

  getStatistics() {
    axios.get(`/summonerStats?summoner=Chubbabubba`)
      .then(({ data }) => {
        this.setState({
          matches: data,
        });
      })
  }

  searchSummoner(summoner) {
    axios.get(`/summonerStats?summoner=${summoner}`)
      .then(({ data }) => {
        this.setState({
          matches: data,
        });
      });
  }

  render() {
    const { matches } = this.state;
    const { searchSummoner } = this;
    return (
      <div className="app">
        <Statistics
          matches={matches}
        />
        <div className="searchBar">
        <Searchbar searchSummoner={searchSummoner} />
        </div>
        <Graph data={matches} />
        <PreviouslySearched searchSummoner={searchSummoner}/>
      </div>
    );
  }
};

export default App;
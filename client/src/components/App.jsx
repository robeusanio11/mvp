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
      kda: [],
      damageDealt: [],
      damageTaken: [],
      view: 'kda',
    };

    this.getStatistics = this.getStatistics.bind(this);
    this.searchSummoner = this.searchSummoner.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    // this.getStatistics();
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
        const { kda, damageDealt, damageTaken} = data;
        this.setState({
          kda,
          damageDealt,
          damageTaken,
        });
      });
  }

  changeView(event) {
    event.preventDefault();
    this.setState({
      view: event.target.value,
    })
  }

  render() {
    const { kda, damageDealt, damageTaken, view } = this.state;
    const { searchSummoner, changeView } = this;
    return (
      <div className="app">
        <Statistics
          kda={kda}
          damageDealt={damageDealt}
          damageTaken={damageTaken}
          view={view}
        />
        <div className="searchBar">
        <Searchbar searchSummoner={searchSummoner} />
        </div>
        <Graph
          view={view}
          kda={kda}
          damageDealt={damageDealt}
          damageTaken={damageTaken}
        />
        <div className="viewButtons">
          <button value="kda" onClick={changeView}>KDA</button>
          <button value="damageDealt" onClick={changeView}>Damage</button>
          <button value="damageTaken" onClick={changeView}>Defense</button>
        </div>
        <PreviouslySearched searchSummoner={searchSummoner}/>
      </div>
    );
  }
};

export default App;
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
      KdaAverages: props.KdaAverages,
      currRank: 0,
    };

    this.searchSummoner = this.searchSummoner.bind(this);
    this.changeView = this.changeView.bind(this);
    this.setCurrRank = this.setCurrRank.bind(this);
    this.getSummoner = this.getSummoner.bind(this);
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

  getSummoner(summoner) {
    axios.get(`/previousStats?summoner=${summoner}`)
      .then(({ data }) => {
        console.log(data[0])
        const { kda, damageDealt, damageTaken} = data[0].matches;
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
    });
  }

  setCurrRank(event) {
    event.preventDefault();
    this.setState({
      currRank: event.target.value,
    });
  }

  render() {
    const { kda, damageDealt, damageTaken, view, KdaAverages, currRank } = this.state;
    const { searchSummoner, changeView, setCurrRank, getSummoner } = this;
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
          KdaAverage={KdaAverages[currRank]}
        />
        <div className="viewButtons">
          Stats:
          <button value="kda" onClick={changeView}>KDA</button>
          <button value="damageDealt" onClick={changeView}>Damage</button>
          <button value="damageTaken" onClick={changeView}>Defense</button>
        </div>
        <div className="rankButtons">
          Averages:
          <button value={0} onClick={setCurrRank}>Iron</button>
          <button value={1} onClick={setCurrRank}>Bronze</button>
          <button value={2} onClick={setCurrRank}>Silver</button>
          <button value={3} onClick={setCurrRank}>Gold</button>
          <button value={4} onClick={setCurrRank}>Platinum</button>
          <button value={5} onClick={setCurrRank}>Diamond</button>
          <button value={6} onClick={setCurrRank}>Master</button>
          <button value={7} onClick={setCurrRank}>GrandMaster</button>
          <button value={8} onClick={setCurrRank}>Challenger</button>
        </div>
        <PreviouslySearched getSummoner={getSummoner}/>
      </div>
    );
  }
};

export default App;
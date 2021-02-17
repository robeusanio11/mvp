import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PreviouslySearched = ({ searchSummoner }) => {
  const [previouslySearched, setPreviouslySearched] = useState([]);

  const getPreviouslySearched = () => {
    return axios.get('/previouslySearched')
      .then(({ data }) => {
        setPreviouslySearched(data);
      });
  }

  const getPreviousEntry = (event) => {
    event.preventDefault();
    searchSummoner(event.target.innerHTML);
  }

  useEffect(() => {
    getPreviouslySearched();
  })

  return (
    <div>
    <h3 className="previouslySearched">Previously Searched</h3>
    {previouslySearched.map((prevSearch) => (
      <div onClick={getPreviousEntry}>{prevSearch.summoner}</div>
    ))}
    </div>
  );
};

export default PreviouslySearched;
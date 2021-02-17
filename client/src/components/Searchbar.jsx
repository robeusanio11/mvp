import React, { useState } from 'react';

const Searchbar = ({ searchSummoner }) => {
  const [summoner, setSummoner] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    searchSummoner(summoner);
  }

  return (
    <div style={{'text-align': 'center'}}>
      <form className="searchForm" onSubmit={handleSubmit}>
        <input className="search" type="text" onChange={event => setSummoner(event.target.value)} value={summoner} placeholder="Search For Summoners" />
        <button className="submit" type="submit" value="Submit">Go</button>
      </form>
    </div>
  );
};

export default Searchbar;
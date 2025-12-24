import React from 'react';

const ButtonMenu = ({
  VIEWS,
  view,
  changeView,
  RANKS,
  currRank,
  handleSetCurrRank,
  lastUpdated
}) => {
  return (
    <div className="controlsContainer">
      <div className="viewButtons">
        <label>Stats:</label>
        <div>
          {VIEWS.map(({ value, label }) => (
            <button
              key={value}
              value={value}
              onClick={changeView}
              className={view === value ? 'selected' : ''}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="rankButtons">
        <label>Averages:</label>
        <div>
          {RANKS.map((rank, index) => (
            <button
              key={rank}
              value={index}
              onClick={handleSetCurrRank}
              className={currRank === index ? 'selected' : ''}
            >
              {rank}
            </button>
          ))}
        </div>
        <div className="lastUpdated">
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default ButtonMenu;

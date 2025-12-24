import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <h1 className="headerTitle">League of Legends Stats Tracker</h1>
      <p className="headerDescription">
        Track your performance with KDA, damage, and defense statistics/graphs across your last 10 matches.
        Compare your stats against rank-based averages analyze your recent gameplay.
      </p>
    </div>
  );
};

export default Header;

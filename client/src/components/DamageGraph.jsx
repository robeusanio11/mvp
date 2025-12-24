import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const DamageGraph = ({ damageDealt, DamageAverage, rankName = 'Iron' }) => {
  if (damageDealt.length < 1) {
    return <div className="preGraph">Try Searching For A Summoner!</div>
  }

  // Add the average bar to the data
  const dataWithAverage = [
    ...damageDealt,
    {
      id: rankName,
      magicDamageDealt: DamageAverage?.magicDamageDealt || 0,
      physicalDamageDealt: DamageAverage?.physicalDamageDealt || 0,
    }
  ];

  return (
  <div className="graph">
    <div className="graphContainer">
      <div className="barGraph">
        <ResponsiveBar
          data={dataWithAverage}
          keys={['magicDamageDealt', 'physicalDamageDealt']}
          indexBy={"id"}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.5}
          animate={true}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={({ id, data }) => {
            // Use distinct gold/orange colors for rank average bar
            if (data && data.id === rankName) {
              return id === 'magicDamageDealt' ? '#FFD700' : '#FF8C00';
            }
            // Regular colors for match data
            return id === 'magicDamageDealt' ? '#667eea' : '#9b59b6';
          }}
          borderWidth={2}
          borderColor={({ data }) => {
            if (data && data.id === rankName) {
              return '#000000';
            }
            return 'transparent';
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
            }]}
            />
      </div>
    </div>
  </div>
  )
}


export default DamageGraph;
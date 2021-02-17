import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const DefenseGraph = ({ damageTaken }) => {
  if (damageTaken.length < 1) {
    return <div className="preGraph">Try Searching For A Summoner!</div>
  }
  return (
  <div className="graph">
    <div className="graphContainer">
      <div className="barGraph">
        <ResponsiveBar
          data={damageTaken}
          keys={['magicalDamageTaken', 'physicalDamageTaken']}
          indexBy={"id"}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.5}
          animate={true}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'set2' }}
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


export default DefenseGraph;
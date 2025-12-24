import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const KdaGraph = ({ kda, KdaAverage }) => {
  if (kda.length < 1) {
    return <div className="preGraph">Try Searching For A Summoner!</div>
  }
  return (
  <div className="graph">
    <div className="graphContainer">
      <div className="barGraph">
        <ResponsiveBar
          data={kda}
          groupMode="grouped"
          keys={['kills', 'deaths', 'assists']}
          indexBy={"id"}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          markers={[
            {
                axis: 'y',
                value: KdaAverage.kills,
                lineStyle: { stroke: '#667eea', strokeWidth: 2 },
                legend: KdaAverage.kills,
                legendOrientation: 'horizontal',
            },
            {
              axis: 'y',
              value: KdaAverage.deaths,
              lineStyle: { stroke: '#ff6bf3ff', strokeWidth: 2 },
              legend: KdaAverage.deaths,
              legendOrientation: 'horizontal',
            },
            {
              axis: 'y',
              value: KdaAverage.assists,
              lineStyle: { stroke: '#ae7bde', strokeWidth: 2 },
              legend: KdaAverage.assists,
              legendOrientation: 'horizontal',
            },
        ]}
          animate={true}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['#667eea', '#ff6bf3ff', '#9b59b6']}
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


export default KdaGraph;
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
                lineStyle: { stroke: '#80f171', strokeWidth: 2 },
                legend: KdaAverage.kills,
                legendOrientation: 'horizontal',
            },
            {
              axis: 'y',
              value: KdaAverage.deaths,
              lineStyle: { stroke: '#e399fa', strokeWidth: 2 },
              legend: KdaAverage.deaths,
              legendOrientation: 'horizontal',
            },
            {
              axis: 'y',
              value: KdaAverage.assists,
              lineStyle: { stroke: '#ffb968', strokeWidth: 2 },
              legend: KdaAverage.assists,
              legendOrientation: 'horizontal',
            },
        ]}
          animate={true}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'accent' }}
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
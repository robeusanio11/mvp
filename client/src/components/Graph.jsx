import React from 'react';
import KdaGraph from './KdaGraph.jsx';
import DamageGraph from './DamageGraph.jsx';
import DefenseGraph from './DefenseGraph.jsx';

const Graph = ({ view, kda, damageDealt, damageTaken, KdaAverage, DamageAverage, DefenseAverage, rankName }) => {
  if (view === 'kda') {
    return (
      <>
        <KdaGraph
          kda={kda}
          KdaAverage={KdaAverage}/>
      </>
    )
  } else if (view === 'damageDealt') {
    return (
      <>
        <DamageGraph
          damageDealt={damageDealt}
          DamageAverage={DamageAverage}
          rankName={rankName} />
      </>
    )
  } else if (view === 'damageTaken') {
    return (
      <>
        <DefenseGraph
          damageTaken={damageTaken}
          DefenseAverage={DefenseAverage}
          rankName={rankName} />
      </>
    )
  }
}

export default Graph;
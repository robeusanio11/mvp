import React from 'react';
import KdaGraph from './KdaGraph.jsx';
import DamageGraph from './DamageGraph.jsx';
import DefenseGraph from './DefenseGraph.jsx';

const Graph = ({ view, kda, damageDealt, damageTaken, KdaAverage }) => {
  if (view === 'kda') {
    console.log(KdaAverage)
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
        <DamageGraph damageDealt={damageDealt} />
      </>
    )
  } else if (view === 'damageTaken') {
    return (
      <>
        <DefenseGraph damageTaken={damageTaken} />
      </>
    )
  }
}

export default Graph;
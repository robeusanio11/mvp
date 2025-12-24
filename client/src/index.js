import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import KdaAverages from './KdaAverages.js';
import DamageDealtAverages from './DamageDealtAverages.js';
import DamageTakenAverages from './DamageTakenAverages.js';

const root = createRoot(document.getElementById('app'));
root.render(<App
  KdaAverages={KdaAverages}
  DamageDealtAverages={DamageDealtAverages}
  DamageTakenAverages={DamageTakenAverages}
/>);
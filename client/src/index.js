import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import KdaAverages from './KdaAverages.js';

const root = createRoot(document.getElementById('app'));
root.render(<App KdaAverages={KdaAverages}/>);
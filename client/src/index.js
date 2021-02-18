import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import KdaAverages from './KdaAverages.js';

ReactDOM.render(<App KdaAverages={KdaAverages}/>, document.getElementById('app'));
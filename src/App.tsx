import React from 'react';
import './App.css';

import { Bar } from './Bar';
import { Chart } from './Chart';

function App() {
  return (
    <div id='wrapper'>
      
      <div id='backdropA' />
      <div id='backdropB' />
      
      <div>
        <Bar />
        <Chart />
      </div>
      <div>
        <Bar />
        <Chart />
      </div>
    </div>
  );
}

export default App;

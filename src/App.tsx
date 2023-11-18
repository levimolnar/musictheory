import React from 'react';
import './App.css';

import { ModeContext } from './ModeContext';
import { Bar } from './Bar';
import { Chart } from './Chart';

function App() {
  return (
    <div id='wrapper'>
      <div id='backdropA' />
      <div id='backdropB' />
      <div>
        <ModeContext>
          <Bar /> 
          <Chart />
        </ModeContext>
      </div>
      <div>
        <ModeContext>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Bar /> 
            <Bar />
          </div>
          <Chart />
        </ModeContext>
      </div>
    </div>
  );
}

export default App;

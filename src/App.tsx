import React from 'react';
import './App.css';

import { ModeContext } from './ModeContext';
import { ProgBar } from './ProgBar';
import { Chart } from './Chart';

function App() {
  return (
    <div id='wrapper'>
      <div id='backdropFull' />
      {/* <div id='backdropA' />
      <div id='backdropB' /> */}
      {/* <div>
        <ModeContext>
          <Bar />
          <div style={{height: '6px'}}/>
          <Chart />
        </ModeContext>
      </div> */}
      {/* <div style={{width: '50px'}}/> */}
      <div>
        <ModeContext>
          <div style={{display: 'flex'}}>
            <Chart />
            <div style={{width: '25px'}}/>
            <div style={{height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'start'}}>
              <ProgBar />
            </div>
          </div>
        </ModeContext>
      </div>
    </div>
  );
}

export default App;

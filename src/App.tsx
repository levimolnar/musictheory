import React from 'react';
import './App.css';

import { ModeContext } from './components/ModeContext';
import { ProgBar } from './components/ProgBar';
import { ModeList } from './components/ModeList';
import { Backdrop } from './components/Backdrop';

function App() {
  return (
    <div id='wrapper'>
      <Backdrop />
      {/* <div id='backdropFull' /> */}
      {/* <div id='backdropA' />
      <div id='backdropB' /> */}
      {/* <div>
        <ModeContext>
          <Bar />
          <div style={{height: '6px'}}/>
          <ModeList />
        </ModeContext>
      </div> */}
      {/* <div style={{width: '50px'}}/> */}
      <div>
        <ModeContext>
          <div style={{display: 'flex'}}>
            <ModeList />
            <div style={{width: '25px'}}/>
            <ProgBar />
            {/* <div style={{width: '50px'}}/>
            <ProgBar /> */}
          </div>
        </ModeContext>
      </div>
    </div>
  );
}

export default App;

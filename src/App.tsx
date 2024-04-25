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
      <ModeContext>
        <div style={{display: 'flex'}}>
          <ModeList />
          <div style={{width: '25px'}}/>
          <ProgBar />
        </div>
      </ModeContext>
    </div>
  );
}

export default App;

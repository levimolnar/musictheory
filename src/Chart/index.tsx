import { v4 as uuidv4 } from 'uuid';

import './Chart.css';
import { useState, useEffect } from 'react';
import { pitchSpeller } from './pitchSpeller';

const defaultScales: {[modeSetName: string]: {[modeName: string]: number[]}} = { 
  "HARM. MAJ. (♭6)": {
    "lydian ♭3":      [0,2,3,6,7,9,11],
    "harm. major":    [0,2,4,5,7,8,11],
    "mixolydian ♭2":  [0,1,4,5,7,9,10],
    "dorian ♭5":      [0,2,3,5,6,9,10],
    "lydian aug. ♯2": [0,3,4,6,8,9,11],  // ♭1!
    "phrygian ♭4":    [0,1,3,4,7,8,10],
    "locrian 𝄫7":     [0,1,3,5,6,8,9],
  },
  "DIATONIC": {
    "lydian":     [0,2,4,6,7,9,11], 
    "ionian":     [0,2,4,5,7,9,11], 
    "mixolydian": [0,2,4,5,7,9,10], 
    "dorian":     [0,2,3,5,7,9,10], 
    "aeolian":    [0,2,3,5,7,8,10], 
    "phrygian":   [0,1,3,5,7,8,10], 
    "locrian":    [0,1,3,5,6,8,10],
  },
  "HARM. MIN. (♯7)": {
    "lydian ♯2":     [0,3,4,6,7,9,11],
    "ionian ♯5":     [0,2,4,5,8,9,11],
    "altered 𝄫7":    [0,1,3,4,6,8,9],    // ♯1!
    "ukr. dorian":   [0,2,3,6,7,9,10],
    "harm. minor":   [0,2,3,5,7,8,11], 
    "phrygian dom.": [0,1,4,5,7,8,10],
    "locrian ♮6":    [0,1,3,5,6,9,10],
  },
  "JAZZ MIN. (♯6, ♯7)": {
    "locrian ♮2":    [0,2,3,5,6,8,10],   // ♯1!
    "lydian aug.":   [0,2,4,6,8,9,11],
    "altered":       [0,1,3,4,6,8,10],   // ♯1!
    "mixolydian ♯4": [0,2,4,6,7,9,10],
    "jazz minor":    [0,2,3,5,7,9,11],
    "aeolian dom.":  [0,2,4,5,7,8,10],
    "phrygian ♮6":   [0,1,3,5,7,9,10],
  },
  "OTHER": {
    "whole-tone": [0,2,4,6,8,10],
    // "diminished": [0,2,3,5,6,8,9,11],
    // "chromatic": [0,1,2,3,4,5,6,7,8,9,10,11],
  }
}

const ScaleHeader = ({text}: {text: string}) => (
  <div className='headerRow'>
    <span className='modeTag'>{text}</span>
  </div>
)

const ScaleRow = ({array}: {array: Array<{char: string, type: string, num: string}>}) => (
  <div className='contentRow'>
    { array ? array.map(chord => <NoteCard chord={chord}/>) : null}
  </div>
)

const NoteCard = ({chord}: {chord: {char: string, type: string, num: string}}) => (
  <div className='card'>
    <div className={'cardContent ' + chord.type} >
      <div className='cardNumber'>{chord.num}</div>
      <div className='cardText'>{chord.char[0]}<span className='accidental'>{chord.char.slice(1,)}</span></div>
    </div>
    <div className='cardShadow' />
  </div>
)

export const Chart = () => {

  const [scales, setScales] = useState<{[key: string]: Array<{id: string, char: string, type: string, num: string}>} | undefined>(undefined)
  const [transpose, setTranspose] = useState<number>(0)
  const [modeSet, setModeSet] = useState<string>(Object.keys(defaultScales)[1])

  useEffect(() => {
    const scalesSpelled = pitchSpeller(defaultScales[modeSet], transpose)
    console.log(scalesSpelled)

    setScales(scalesSpelled)
  }, [modeSet, transpose]);

  return (
    <>
      <div className='settingsBar blur'>
        <input type="number" style={{width: '30px', height: '20px', backgroundColor: '#333', color: 'white', padding: '0 0 0 5px', borderRadius: '4px', border: 'none', outline: 'none'}} value={transpose} min={0} max={11} onChange={(e: any) => setTranspose(e.target.value)} />
        <select style={{height: '20px', backgroundColor: '#333', color: 'white', borderRadius: '4px', border: 'none', outline: 'none'}} value={modeSet} onChange={(e: any) => setModeSet(e.target.value)}>
          { Object.keys(defaultScales).map(ms => <option value={ms}>{ms}</option>) }
        </select>
      </div>

      <div className='chart blur'>
        { 
          scales ? (
            <>
              <div className='chartHeaders'>
                { Object.keys(scales).map(scaleName => <ScaleHeader text={scaleName} />) }
              </div>
              <div className='chartContent'>
                { Object.values(scales).map(scaleChars => <ScaleRow array={scaleChars} />) }
              </div>
            </>
          ) : <></>
        }
      </div>
    </>
  );
}

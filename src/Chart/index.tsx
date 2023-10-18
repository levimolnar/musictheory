import { v4 as uuidv4 } from 'uuid';

import './Chart.css';
import { useState, useEffect } from 'react';

import { DndContext, DragOverlay, rectIntersection, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

import { pitchSpeller } from './pitchSpeller';

import { NoteCard } from '../NoteCard';
import { ProgContext } from '../ModeContext';

const mod = (n: number, m: number) => ((n % m) + m) % m;

const defaultScales: {[modeSetName: string]: {[modeName: string]: number[]}} = { 
  "Diatonic": {
    "lydian":     [0,2,4,6,7,9,11], 
    "ionian":     [0,2,4,5,7,9,11], 
    "mixolydian": [0,2,4,5,7,9,10], 
    "dorian":     [0,2,3,5,7,9,10], 
    "aeolian":    [0,2,3,5,7,8,10], 
    "phrygian":   [0,1,3,5,7,8,10], 
    "locrian":    [0,1,3,5,6,8,10],
  },
  "Harm. Minor": { // (♯7)
    "lydian ♯2":     [0,3,4,6,7,9,11],
    "ionian ♯5":     [0,2,4,5,8,9,11],
    "altered 𝄫7":    [0,1,3,4,6,8,9],    // ♯1!
    "ukr. dorian":   [0,2,3,6,7,9,10],
    "harm. minor":   [0,2,3,5,7,8,11], 
    "phrygian dom.": [0,1,4,5,7,8,10],
    "locrian ♮6":    [0,1,3,5,6,9,10],
  },
  "Harm. Major": { // (♭6)
    "lydian ♭3":      [0,2,3,6,7,9,11],
    "harm. major":    [0,2,4,5,7,8,11],
    "mixolydian ♭2":  [0,1,4,5,7,9,10],
    "dorian ♭5":      [0,2,3,5,6,9,10],
    "lydian aug. ♯2": [0,3,4,6,8,9,11],  // ♭1!
    "phrygian ♭4":    [0,1,3,4,7,8,10],
    "locrian 𝄫7":     [0,1,3,5,6,8,9],
  },
  "Jazz Minor": { // (♯6, ♯7)
    "locrian ♮2":    [0,2,3,5,6,8,10],   // ♯1!
    "lydian aug.":   [0,2,4,6,8,9,11],
    "altered":       [0,1,3,4,6,8,10],   // ♯1!
    "mixolydian ♯4": [0,2,4,6,7,9,10],
    "jazz minor":    [0,2,3,5,7,9,11],
    "aeolian dom.":  [0,2,4,5,7,8,10],
    "phrygian ♮6":   [0,1,3,5,7,9,10],
  },
  "Other": {
    "whole-tone": [0,2,4,6,8,10],
    // "major blues": [0,2,3,4,7,9],
    // "minor blues": [0,3,5,6,7,10],
    // "pentatonic": [0,2,4,7,9],
    // "diminished": [0,2,3,5,6,8,9,11],
    // "chromatic": [0,1,2,3,4,5,6,7,8,9,10,11],
  }
}

const ScaleHeader = ({text}: {text: string}) => (
  <div className='headerRow'>
    <span className='modeTag'>{text}</span>
  </div>
)

export const ChordDraggable = ({chordCoords, chord, setFunc, children}: {chordCoords: {scale: string, index: number}, chord: any, setFunc: any, children: any}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({id: chord.id, data: {chordCoords: chordCoords, chord: chord, setFunc: setFunc}})

  const dragStyle = { opacity: isDragging ? '0' : '1' }

  return (
    <div style={dragStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

const ScaleRow = ({scaleName, array, setFunc}: {scaleName: string, array: Array<{id: string, char: string, type: string, num: string}>, setFunc: any}) => (
  <div className='contentRow'>
    { 
      array ? array.map((chord, i) => { 
        const chordCoords = {scale: scaleName, index: i};
        return (
          <ChordDraggable chordCoords={chordCoords} chord={chord} setFunc={setFunc}>
            <NoteCard chord={chord}/>
          </ChordDraggable>
        )
      })
      : null
    }
  </div>
)

export const Chart = () => {

  const [transpose, setTranspose] = useState<number>(0)
  const [modeSet, setModeSet] = useState<string>(Object.keys(defaultScales)[0])
  const [scales, setScales] = useState<{[key: string]: Array<{id: string, char: string, type: string, num: string}>} | undefined>(undefined)

  useEffect(() => {
    setScales(pitchSpeller(defaultScales[modeSet], transpose))
  }, [modeSet, transpose]);

  return (
    <>
      <div className='settingsBar blur'>
        <div style={{margin: '2px 0 2px 0', display: 'flex', borderRight: '2px solid #00000055'}}>
          <div style={{backgroundColor: '#333', color: '#fff', textAlign: 'center', width: '22px', height: '22px', lineHeight: '22px', borderRadius: '50%', fontSize: '.8em', margin: '1.5px 0 1.5px 10px', borderTop: '1px solid #ffffff88', borderRight: '1px solid #ffffff88'}}>{transpose}</div>
          <div style={{display: 'flex', flexDirection: 'column', height: '26px', margin: '0 5px 0 5px'}}>
            <div className='transposeButton' onClick={() => setTranspose((t) => mod((t+1), 12))}>▴</div>
            <div className='transposeButton' onClick={() => setTranspose((t) => mod((t-1), 12))}>▾</div>
          </div>
        </div>
        <select style={{height: '20px', backgroundColor: '#333', color: 'white', borderRadius: '10px', paddingLeft: '5px', margin: '5px', outline: 'none', border: 'none'}} value={modeSet} onChange={(e: any) => setModeSet(e.target.value)}>
          { Object.keys(defaultScales).map(ms => <option value={ms}>{ms}</option>) }
        </select>
      </div>

      <div className='chart blur'>
        { 
          scales ? (
            <>
              <div className='chartHeaders'>
                { Object.keys(scales).map((scaleName: string) => <ScaleHeader text={scaleName} />) }
              </div>
              <div className='chartContent'>
                { Object.keys(scales).map((scaleName: string) => <ScaleRow scaleName={scaleName} array={scales[scaleName]} setFunc={setScales} />) }
              </div>
            </>
          ) : <div>LOADING... or broken.</div>
        }
      </div>
    </>
  );
}

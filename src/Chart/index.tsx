import { v4 as uuidv4 } from 'uuid';

import './Chart.css';
import { useState, useEffect } from 'react';

import { DndContext, DragOverlay, rectIntersection, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

import { pitchSpeller } from './pitchSpeller';
import ChordTree from './chordTree';

import { NoteCard } from '../NoteCard';
import { defScaleObj } from './defScaleObj';

const mod = (n: number, m: number) => ((n % m) + m) % m;

const ScaleHeader = ({text}: {text: string}) => {
  const BravuraChars = [
    "\uED60", // flat
    "\uED61", // natural
    "\uED62", // sharp
    "\uED63", // double sharp
    "\uED64", // double flat
  ];

  return (
    <div className='headerRow'>
      <span className='modeTag'>
        {[...text].map((char: string) => (BravuraChars.includes(char)) 
          ? <span style={{fontFamily: 'Bravura', letterSpacing: '2px'}}>{char}</span> 
          : char
        )}
      </span>
    </div>
  )
}
  

export const ChordDraggable = ({chordDir, chord, setFunc, children}: {chordDir: {scale: string, index: number}, chord: any, setFunc: any, children: any}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({id: chord.id, data: {payload: {chordDir: chordDir, chord: chord, setFunc: setFunc, origin: 'chart'}}})

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
        const chordDir = {scale: scaleName, index: i};
        return (
          <ChordDraggable key={chord.id} chordDir={chordDir} chord={chord} setFunc={setFunc}>
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
  const [modeSet, setModeSet] = useState<string>(Object.keys(defScaleObj)[0])
  const [scales, setScales] = useState<{[key: string]: Array<{id: string, char: string, type: string, num: string}>} | undefined>(undefined)

  useEffect(() => {
    setScales(pitchSpeller(defScaleObj[modeSet], transpose))

    const chordTree = new ChordTree();
    chordTree.insertChord([3, 3], 'Diminished');
    chordTree.insertChord([3, 4], 'Minor');
    chordTree.insertChord([4, 3], 'Major');
    chordTree.insertChord([4, 4], 'Augmented');
    chordTree.insertChord([3, 3, 3], 'Diminished 7th');
    chordTree.insertChord([3, 3, 4], 'Half-diminished 7th');
    chordTree.insertChord([3, 4, 3], 'Minor 7th');
    chordTree.insertChord([3, 4, 4], 'Minor major 7th');
    chordTree.insertChord([4, 3, 3], 'Dominant 7th');
    chordTree.insertChord([4, 3, 4], 'Major 7th');
    chordTree.insertChord([4, 4, 2], 'Augmented 7th');
    chordTree.insertChord([4, 4, 3], 'Augmented major 7th');

    console.log(chordTree);

    // console.log(chordTree.findChord([4, 3, 4])); // Should return 'Major 7th'
    // console.log(chordTree.findChord([3, 4, 3])); // Should return 'Minor 7th'
    // console.log(chordTree.findChord([4, 3, 5])); // Should return null (Chord not found)

  }, [modeSet, transpose]);

  const [uniqueChartId] = useState(uuidv4());

  return (
    <div style={{width: 'min-content'}}>
      <div className='settingsBar blur'>
        <div style={{margin: '2px 0 2px 0', display: 'flex', borderRight: '2px solid #00000055'}}>
          <div style={{backgroundColor: '#333', color: '#fff', textAlign: 'center', width: '22px', height: '22px', lineHeight: '22px', borderRadius: '50%', fontSize: '.8em', margin: '1.5px 0 1.5px 10px', borderTop: '1px solid #ffffff88', borderRight: '1px solid #ffffff88'}}>{transpose}</div>
          <div style={{display: 'flex', flexDirection: 'column', height: '26px', margin: '0 5px 0 5px'}}>
            <div className='transposeButton' onClick={() => setTranspose((t) => mod((t+1), 12))}>▴</div>
            <div className='transposeButton' onClick={() => setTranspose((t) => mod((t-1), 12))}>▾</div>
          </div>
        </div>
        <select style={{height: '20px', backgroundColor: '#333', color: 'white', borderRadius: '10px', paddingLeft: '5px', margin: '5px', outline: 'none', border: 'none'}} value={modeSet} onChange={(e: any) => setModeSet(e.target.value)}>
          { Object.keys(defScaleObj).map(ms => <option key={'option-' + ms} value={ms}>{ms}</option>) }
        </select>
      </div>
      <div className='chart blur'>
        { 
          scales ? (
            <>
              <div className='chartHeaders'>
                { Object.keys(scales).map((scaleName: string) => <ScaleHeader key={'header-' + scaleName + uniqueChartId} text={scaleName} />) }
              </div>
              <div className='chartContent'>
                { Object.keys(scales).map((scaleName: string) => <ScaleRow key={'content-' + scaleName + uniqueChartId} scaleName={scaleName} array={scales[scaleName]} setFunc={setScales} />) }
              </div>
            </>
          ) : <div style={{width: 'min-content', fontSize: '.8em', textAlign: 'center', padding: '10px'}}>LOADING...</div>
        }
      </div>
    </div>
  );
}

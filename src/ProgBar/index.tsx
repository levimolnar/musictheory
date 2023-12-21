import { useContext, useState, useEffect, StrictMode } from 'react';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import './Bar.css';

import { NoteCard } from '../NoteCard';
import { ProgContext } from '../ModeContext';
import { useDroppable } from '@dnd-kit/core';
import { Chord, Progression, Line } from '../types';

const SortableItem = ({chord, setFunc, index, seventh}: {chord: Chord, setFunc: any, index: number, seventh: boolean}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chord.id, 
    data: {payload: {chord, setFunc, index, origin: 'progBar', seventh}},
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '.6' : '1',
    filter: isDragging ? 'brightness(.8)' : 'none',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NoteCard chord={chord} seventh={seventh}/>
    </div>
  )
};

const EmptyItem = ({id, setFunc}: {id: string, setFunc: any}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id, disabled: true, data: {payload: {setFunc: setFunc, origin: 'progBar'}}})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '100%',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='empty'>＋</div>
    </div>
  )
};

export const ProgLine = ({prog, chordFuncs, lineId}: {prog: Progression, chordFuncs: any, lineId: string}) => {

  return (
    <SortableContext
      items={prog.map((i: any) => i.id)}
      strategy={horizontalListSortingStrategy} 
      // id={'sortable-' + lineId}
      id={lineId}
    >
      {/* <div className='line' style={{width: 'min-content', boxShadow: '0px 2px 2px #ffffff33'}}>
        {
          prog.length
            ? prog.map((chord: any, i) => <SortableItem key={chord.id} chord={chord} setFunc={chordFuncs} index={i} seventh={chord.seventh}/>) 
            : <EmptyItem id={'empty-' + lineId} setFunc={chordFuncs}/>
        }
      </div> */}
      {
        prog.length
          ? <div className='line' style={{width: 'min-content', boxShadow: '0px 2px 2px #ffffff33'}}>
              { prog.map((chord: any, i) => <SortableItem key={chord.id} chord={chord} setFunc={chordFuncs} index={i} seventh={chord.seventh}/>) }
            </div>
          : <div className='line' style={{width: '100%', boxShadow: '0px 2px 2px #ffffff33'}}>
              <EmptyItem id={'empty-' + lineId} setFunc={chordFuncs}/>
            </div>
      }
    </SortableContext>
  )
}

export const ProgBar = () => {
  
  const defLineObj: Line = {
    lineId: uuidv4(), 
    // progression: [
    //   {id: uuidv4(), root: 'D', type: {full: "Minor", short: "min", symbol: "m"}, num: 'ii', seventh: true},
    //   {id: uuidv4(), root: 'G', type: {full: "Major", short: "maj", symbol: "" }, num: 'V' , seventh: true},
    //   {id: uuidv4(), root: 'C', type: {full: "Major", short: "maj", symbol: "" }, num: 'I' , seventh: false},
    // ],
    progression: [
      {id: uuidv4(), root: 'D', type: {full: "Half-diminished seventh", short: "hdim7", symbol: "\uE8717" }, num: '0', seventh: true},
      {id: uuidv4(), root: 'G', type: {full: "Dominant seventh", short: "dom7", symbol: "7"}, num: '0', seventh: true},
      {id: uuidv4(), root: 'C', type: {full: "Minor", short: "min", symbol: "m" }, num: '0', seventh: false},
    ],
  }

  const copyLine = (prog: Progression) => {
    const newLineObj = {
      lineId: uuidv4(), 
      progression: prog.map((chord: Chord) => {
        return {...chord, id: uuidv4()}
      }),
    };

    return newLineObj;
  }

  const [lineArray, setLineArray] = useState<Line[]>([]);

  useEffect(() => {
    setLineArray([defLineObj])
  }, [])

  const addChord = (lineId: string, chordIndex: number, chord: Chord) => {
    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: [...line.progression.slice(0, chordIndex), chord, ...line.progression.slice(chordIndex)]}
    }));
  };

  const removeChord = (lineId: string, chordId: string) => {
    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: [...line.progression].filter((chord: Chord) => chord.id !== chordId)}
    }));
  };

  const swap = (array: Array<any>, a: number, b: number) => {
    return (a < b)
    ? [...array.slice(0, a), ...array.slice(a+1, b+1), array[a], ...array.slice(b+1)] 
    : [...array.slice(0, b), array[a], ...array.slice(b, a), ...array.slice(a+1)]
  };

  const swapChords = (lineId: string, chordIndexA: number, chordIndexB: number) => {
    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: swap(line.progression, chordIndexA, chordIndexB)}
    }));
  };

  // const [barWidth, setBarWidth] = useState<number>(0);
  // const [decreaseBool, setDecreaseBool] = useState<boolean | undefined>(undefined);

  // const NOTE_CARD_WIDTH = 25;
  // const MARGIN_WIDTH = 8;

  // // check if width change is increase or decrease, 
  // useEffect(() => {
  //   setDecreaseBool(barWidth > items.length*NOTE_CARD_WIDTH + (items.length-1)*MARGIN_WIDTH);
  //   setBarWidth(items.length*NOTE_CARD_WIDTH + (items.length-1)*MARGIN_WIDTH);
  // }, [items]);

  // // apply transition effect only in case of width decrease
  // const widthStyle = {
  //   // width: `${barWidth}px`,
  //   // width: 'min-content',
  //   width: 'min-content',
  //   transition: decreaseBool ? 'width 100ms ease-out' : 'none',
  // };

  // console.log(lineArray);

  return (
    <div className='componentWrapper'>
      <div className='backdrop blur'/>
      <div className='bar'>
        <StrictMode>
          {lineArray.map(({lineId, progression}: Line, i: number) => (
            <div style={{display: 'flex'}}>
              <ProgLine key={lineId} lineId={lineId} prog={progression} chordFuncs={{add: addChord, remove: removeChord, swap: swapChords}}/>
              {
                (lineArray.length > 1)
                  ? <div className='removeLineButton' onClick={() => setLineArray((prev: any) => [...prev].filter((_, j) => j !== i))}>×</div>
                  : <></>
              }
            </div>
          ))}
        </StrictMode>
        {/* <div style={{width: 'auto', display: 'flex', justifyContent: 'center'}}>
          <div 
            className='newLineButton' 
            onClick={() => setLineArray((prev: any) => [...prev, copyLine(prev[prev.length-1].progression)])}
          >
            +
          </div>
        </div> */}
        <div style={{width: '100%', position: 'absolute', bottom: '-30px'}}>
          <div style={{width: 'auto', display: 'flex', justifyContent: 'center', gap: '5px'}}>
            <div 
              className='newLineButton' 
              onClick={() => setLineArray((prev: any) => [...prev, copyLine(prev[prev.length-1].progression)])}
            >
              c
            </div>
            <div 
              className='newLineButton'
              // style={{fontSize: '1.3em'}}
              onClick={() => setLineArray((prev: any) => [...prev, copyLine([])])}
            >
              e
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
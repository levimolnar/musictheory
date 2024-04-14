import { useState, useEffect, StrictMode } from 'react';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { v4 as uuidv4 } from 'uuid';

import './Bar.css';

import { NoteCard, NoteCardWide } from '../NoteCard';
import { useDroppable } from '@dnd-kit/core';
import { Chord, Progression, Line } from '../types';

const SortableItem = ({
  chord, 
  setFunc, 
  index, 
  seventh, 
}: {
  chord: Chord, 
  setFunc: any, 
  index: number, 
  seventh?: boolean, 
}) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chord.id, 
    data: {chord, setFunc, index, origin: 'progBar', seventh},
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? '.6' : '1',
    filter: isDragging ? 'brightness(.8)' : 'none',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      { seventh ? <NoteCardWide chord={chord}/> : <NoteCard chord={chord}/> }
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
  } = useSortable({id: id, disabled: true, data: {setFunc, origin: 'progBar'}})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 'calc(100% - 20px)',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='empty'>＋</div>
    </div>
  )
};

export const ProgLine = ({prog, chordFuncs, lineId}: {prog: Progression, chordFuncs: any, lineId: string}) => {

  const {setNodeRef} = useDroppable({
    id: `${lineId}-droppable`,
    data: {origin: 'droppable', setFunc: chordFuncs} 
  });

  // console.log(lineId, prog);

  return (
    <div style={{width: '100%', boxShadow: '0px 2px 2px #ffffff33'}}>
      <SortableContext
        items={prog.map((chord: Chord) => chord.id)}
        strategy={horizontalListSortingStrategy} 
        id={lineId}
      >
        {
          prog.length
            ? <div className='line' style={{width: 'min-content'}}>
                { prog.map((chord: any, i: any) => <SortableItem key={chord.id} chord={chord} setFunc={chordFuncs} index={i} seventh={chord.seventh}/>) }
              </div>
            : <div className='line' style={{width: '100%'}}>
                <EmptyItem id={'empty-' + lineId} setFunc={chordFuncs}/>
              </div>
        }
      </SortableContext>
      {/* <div ref={setNodeRef} style={{width: '100%', backgroundColor: '#ffff0033'}} /> */}
    </div>
  )
}

export const ProgBar = () => {
  
  const defLineObj: Line = {
    lineId: uuidv4(), 
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

  const chordAppend = (lineId: string, chordIndex: number, chord: Chord) => {
    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: [...line.progression.slice(0, chordIndex), chord, ...line.progression.slice(chordIndex)]}
    }));
  };

  const chordPush = (lineId: string, chord: Chord) => {
    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: [...line.progression, chord]}
    }));
  };

  const chordRemove = (lineId: string, chordId: string) => {
    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: [...line.progression].filter((chord: Chord) => chord.id !== chordId)}
    }));
  };

  const chordPop = (lineId: string, chord: Chord) => {
    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: line.progression.slice(0, -1)}
    }));
  };

  const chordSwap = (lineId: string, chordIndexA: number, chordIndexB: number) => {

    const swap = (array: Array<any>, a: number, b: number) => {
      return (a < b)
      ? [...array.slice(0, a), ...array.slice(a+1, b+1), array[a], ...array.slice(b+1)] 
      : [...array.slice(0, b), array[a], ...array.slice(b, a), ...array.slice(a+1)]
    };

    setLineArray((prev: Line[]) => prev.map((line: Line) => {
      return (line.lineId !== lineId )
      ? line
      : {...line, progression: swap(line.progression, chordIndexA, chordIndexB)}
    }));
  };

  const chordFuncs = {chordAppend, chordPush, chordRemove, chordPop, chordSwap};

  return (
    <div className='componentWrapper'>
      <div className='backdrop blur'/>
      <div className='bar'>
        <StrictMode>
          {lineArray.map(({lineId, progression}: Line, i: any) => (
            <div style={{display: 'flex'}}>
              <ProgLine key={lineId} lineId={lineId} prog={progression} chordFuncs={chordFuncs}/>
              {
                (lineArray.length > 1)
                  ? <div className='removeLineButton' onClick={() => setLineArray((prev: any) => [...prev].filter((_, j) => j !== i))}>×</div>
                  : <></>
              }
            </div>
          ))}
        </StrictMode>
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
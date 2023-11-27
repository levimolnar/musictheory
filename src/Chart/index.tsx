import { v4 as uuidv4 } from 'uuid';

import './Chart.css';
import { useState, useEffect, createContext, useContext } from 'react';

import { DndContext, DragOverlay, rectIntersection, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

import { NoteCard } from '../NoteCard';
import { getIntervalStrings, getSpellingPath, getNumerals } from './modeFunctions';
import { characterMatrix, chordIntervals, defModeRecipes } from './modeData';

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

export const ChordDraggable = ({chord, setFunc, index, children}: {chord: any, setFunc: any, index: number, children: any}) => {

  const {seventh} = useContext(ChartContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id: chord.id, 
    data: {payload: {chord, setFunc, index, origin: 'chart', seventh: seventh}},
  })

  const dragStyle = { opacity: isDragging ? '0' : '1' }

  return (
    <div style={dragStyle} ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  )
}

const ScaleRow = ({scaleName, recipe}: {scaleName: string, recipe: number[]}) => {

  const {seventh, numeralReference} = useContext(ChartContext);

  const [chords, setChords] = useState<Array<{id: string, root: string, type: {full: string, short: string, symbol: string}, num: string}> | undefined>(undefined);

  useEffect(() => {
    const spellingPath = getSpellingPath(recipe);
    const intervalStrings = getIntervalStrings(recipe, 4);
    const numerals = getNumerals(recipe, numeralReference);

    const chordsArray = recipe.map((_, i) => {
      const id = uuidv4();
      const [rootX, rootY] = spellingPath[i];
      const root = characterMatrix[rootX][rootY];
      const type = chordIntervals[+intervalStrings[i]];
      const num = String(numerals[i]);

      return {id, root, type, num};
    });
    
    setChords(chordsArray);
  }, [scaleName, recipe]);
  
  return (
    <div className='contentRow'>
      { 
        chords ? chords.map((chord, i) => { 
          return (
            <ChordDraggable key={chord.id} chord={chord} setFunc={setChords} index={i}>
              <NoteCard chord={chord} seventh={seventh}/>
            </ChordDraggable>
          )
        })
        : null
      }
    </div>
  )
}

const ChartContext = createContext<{seventh: boolean, numeralReference: number[]}>({seventh: false, numeralReference: []});

export const Chart = () => {

  const [transpose, setTranspose] = useState<number>(0);
  const [modeTab, setModeTab] = useState<string>(Object.keys(defModeRecipes)[0]);
  const [modes, setModes] = useState<{[key: string]: number[]} | undefined>(undefined);

  const [seventhEnabled, setSeventhEnabled] = useState<boolean>(false);

  const transposeRecipe = (recipe: number[], transpose: number) => Array.from(recipe, (i) => (i + transpose) % 12);
  const transposeObj = (modeObj: {[modeName: string]: number[]}, transpose: number) => {
    let transposedScaleObj: any = {};

    Object.entries(modeObj).forEach(([modeName, recipe]) => {
      const transposedRecipe = transposeRecipe(recipe, transpose);
      transposedScaleObj[modeName] = transposedRecipe;
    });

    return transposedScaleObj;
  }

  useEffect(() => {
    const modeObj = defModeRecipes[modeTab];
    const transposedModeObj = transposeObj(modeObj, transpose);
    setModes(transposedModeObj);
  }, [modeTab, transpose]);

  const [uniqueChartId] = useState(uuidv4());

  return (
    <ChartContext.Provider value={{seventh: seventhEnabled, numeralReference: transposeRecipe([0,2,4,5,7,9,11], transpose)}}>
    {/* <ChartContext.Provider value={{seventh: seventhEnabled, numeralReference: transposeRecipe([0,2,3,5,7,8,10], transpose)}}>
    <ChartContext.Provider value={{seventh: seventhEnabled, numeralReference: transposeRecipe([0,1,3,4,6,8,9], transpose)}}> */}
      <div style={{width: 'min-content'}}>
        <div className='settingsBar blur'>
          <div style={{margin: '2px 0 2px 0', display: 'flex', borderRight: '2px solid #00000055'}}>
            <div style={{backgroundColor: '#333', color: '#fff', textAlign: 'center', width: '22px', height: '22px', lineHeight: '22px', borderRadius: '50%', fontSize: '.8em', margin: '1.5px 0 1.5px 10px', borderTop: '1px solid #ffffff88', borderRight: '1px solid #ffffff88'}}>{transpose}</div>
            <div style={{display: 'flex', flexDirection: 'column', height: '26px', margin: '0 5px 0 5px'}}>
              <div className='transposeButton' onClick={() => setTranspose((t) => mod((t+1), 12))}>▴</div>
              <div className='transposeButton' onClick={() => setTranspose((t) => mod((t-1), 12))}>▾</div>
            </div>
          </div>
          <select style={{height: '20px', backgroundColor: '#333', color: 'white', borderRadius: '10px', paddingLeft: '5px', margin: '5px', outline: 'none', border: 'none'}} value={modeTab} onChange={(e: any) => setModeTab(e.target.value)}>
            { Object.keys(defModeRecipes).map(ms => <option key={'option-' + ms} value={ms}>{ms}</option>) }
          </select>
          <div 
            className='seventhButton'
            onClick={() => setSeventhEnabled((prev) => !prev)} 
            style={{border: seventhEnabled ? '2px solid transparent' : '2px solid #ddd', color: seventhEnabled ? '#ddd' : '#ddd', background: seventhEnabled ? '#333' : 'none'}}
          >
            7th
          </div>
        </div>
        <div className='chart blur'>
          { 
            modes ? (
              <>
                <div className='chartHeaders'>
                  { Object.keys(modes).map((modeName: string) => <ScaleHeader key={'header-' + modeName + uniqueChartId} text={modeName}/>) }
                </div>
                <div className='chartContent'>
                  { Object.keys(modes).map((modeName: string) => <ScaleRow key={'content-' + modeName + uniqueChartId} scaleName={modeName} recipe={modes[modeName]}/>) }
                </div>
              </>
            ) : <div style={{width: 'min-content', fontSize: '.8em', textAlign: 'center', padding: '10px'}}>LOADING...</div>
          }
        </div>
      </div>
    </ChartContext.Provider>
  );
}

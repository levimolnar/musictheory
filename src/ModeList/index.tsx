import { v4 as uuidv4 } from 'uuid';

import './ModeList.css';
import { useState, useEffect, createContext, useContext } from 'react';

import { DndContext, DragOverlay, rectIntersection, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

import { NoteCard } from '../NoteCard';
import { getIntervalStrings, getSpellingPath, getNumerals, getIntervalString, getOffset } from './modeFunctions';
import { characterMatrix, chordIntervals, defModeRecipes } from './modeData';

const mod = (n: number, m: number) => ((n % m) + m) % m;

const SettingsBar = ({
  settingValues, 
  settingFunctions
}: {
  settingValues: [
    number, 
    string, 
    boolean
  ], 
  settingFunctions: [
    React.Dispatch<React.SetStateAction<number>>, 
    React.Dispatch<React.SetStateAction<string>>, 
    React.Dispatch<React.SetStateAction<boolean>>
  ]
}) => {
  
  const [transpose, modeTab, seventhEnabled] = settingValues;
  const [setTranspose, setModeTab, setSeventhEnabled] = settingFunctions;

  return (
    <div className='componentWrapperFill' style={{marginBottom: '6px'}}>
      <div className='backdrop blur'/>
      <div className='settingsBar'>
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
    </div>
  )
}

const ChordDraggable = ({chord, setFunc, index}: {chord: any, setFunc: any, index: number}) => {

  const {seventh} = useContext(ModeListContext);

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
  } = useDraggable({
    id: chord.id, 
    data: {payload: {chord, setFunc, index, origin: 'modeList', seventh: seventh}},
  })

  const dragStyle = { opacity: isDragging ? '0' : '1' }

  return (
    <div style={dragStyle} ref={setNodeRef} {...attributes} {...listeners}>
      <NoteCard chord={chord} seventh={seventh}/>
    </div>
  )
}

const ScaleHeader = ({scaleName, scaleRecipe}: {scaleName: string, scaleRecipe: number[]}) => {

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
        {[...scaleName].map((char: string) => (BravuraChars.includes(char)) 
          ? <span style={{fontFamily: 'Bravura', letterSpacing: '2px'}}>{char}</span> 
          : char
        )}
      </span>
    </div>
  )
}

const ScaleRow = ({scaleName, scaleRecipe}: {scaleName: string, scaleRecipe: number[]}) => {

  const {seventh, ref} = useContext(ModeListContext);

  const [chords, setChords] = useState<Array<{id: string, root: string, type: {full: string, short: string, symbol: string}, num: string}> | undefined>(undefined);

  useEffect(() => {

    // const start = performance.now();

    const spellingPath = getSpellingPath(scaleRecipe);

    const chordsArray = scaleRecipe.map((x, i) => {
      const [rootX, rootY] = spellingPath[i];
      const root = characterMatrix[rootX][rootY];
      const chordRecipe = Array.from({length: seventh ? 4 : 3 }, (_, j) => scaleRecipe[(i + 2*j) % scaleRecipe.length]);
      const type = chordIntervals[+getIntervalString(chordRecipe)];
      const offset = getOffset(x, ref!.numRef[i]);

      return {id: uuidv4(), root, type, num: String(offset)};
    });

    
    // const end = performance.now();
    // console.log(`${scaleName}: ${end - start} ms`);
    
    setChords(chordsArray);
    
  }, [scaleName, scaleRecipe, ref, seventh]);
  
  // console.log(chords);

  return (
    <div className='contentRow'>
      { 
        chords
        ? chords.map((chord, i) => <ChordDraggable key={chord.id} chord={chord} setFunc={setChords} index={i}/>)
        : null
      }
    </div>
  )
}

const ModeListContext = createContext<{seventh: boolean, ref: {numRef: number[], numFunc: any} | undefined}>({seventh: false, ref: undefined});

export const ModeList = () => {

  const [modes, setModes] = useState<{[key: string]: number[]} | undefined>(undefined);
  const [transpose, setTranspose] = useState<number>(0);
  const [modeTab, setModeTab] = useState<string>(Object.keys(defModeRecipes)[0]);
  const [seventhEnabled, setSeventhEnabled] = useState<boolean>(false);

  const [refCoord, setRefCoord] = useState<[string, number]>(['Diatonic', 1]);
  const [numRef, setNumRef] = useState<number[]>([0,2,4,5,7,9,11]);

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

    setNumRef(transposeRecipe(Object.values(defModeRecipes[refCoord[0]])[refCoord[1]], transpose));
  }, [modeTab, transpose, refCoord]);

  const [uniqueModeListId] = useState(uuidv4());

  return (
    <ModeListContext.Provider value={{seventh: seventhEnabled, ref: {numRef: numRef, numFunc: setNumRef}}}>
      <div style={{width: 'min-content'}}>
        <SettingsBar settingValues={[transpose, modeTab, seventhEnabled]} settingFunctions={[setTranspose, setModeTab, setSeventhEnabled]}/>
        <div className='componentWrapper'>
          <div className='backdrop blur'/>
          <div className='modeList'>
            { 
              modes ? (
                <>
                  <div style={{position: 'absolute', left: '-30px'}}>
                    <div style={{position: 'absolute', zIndex: '2', width: '30px', height: '100%', pointerEvents: 'none'}}>
                      <div style={{position: 'absolute', width: '18px', height: '18px', top: `${refCoord[1]*50 + 16}px`, background: (modeTab === refCoord[0]) ? 'radial-gradient(#ff0055 33.3%, transparent 50%)' : 'none', transition: (modeTab === refCoord[0]) ? 'top 250ms ease-in-out' : 'none'}}></div> 
                    </div>                    
                    { Object.keys(modes).map((modeName: string, i) =>
                      <div style={{width: '25px', height: '50px', display: 'flex', alignItems: 'center'}}>
                        <div 
                          className='referenceButton'
                          onClick={() => {
                            setRefCoord([modeTab, i]);
                            // setNumRef(modes[modeName]);
                          }}/>
                        </div> 
                      ) 
                    }
                  </div>
                  <div className='modeListHeaders'>
                    { Object.keys(modes).map((modeName: string) => <ScaleHeader key={'header-' + modeName + uniqueModeListId} scaleName={modeName} scaleRecipe={modes[modeName]}/>) }
                  </div>
                  <div className='modeListContent'>
                    { Object.keys(modes).map((modeName: string) => <ScaleRow key={'content-' + modeName + uniqueModeListId} scaleName={modeName} scaleRecipe={modes[modeName]}/>) }
                  </div>
                </>
              ) : <div style={{width: 'min-content', fontSize: '.8em', textAlign: 'center', padding: '10px'}}>LOADING...</div>
            }
          </div>
        </div>
      </div>
    </ModeListContext.Provider>
  );
}

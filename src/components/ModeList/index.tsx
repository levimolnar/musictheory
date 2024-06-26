import { v4 as uuidv4 } from 'uuid';

import './ModeList.css';
import { useState, useEffect, createContext, useContext } from 'react';

import { useDraggable } from '@dnd-kit/core';

import { NoteCard, NoteCardWide } from '../NoteCard';
import { getSpellingPath, getIntervalString, getOffset } from './modeFunctions';
import { chordIntervals, combinedMatrix, defModeRecipes } from './modeData';

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
          <div style={{
            backgroundColor: '#333', 
            color: '#fff', 
            textAlign: 'center', 
            width: '22px', 
            height: '22px', 
            lineHeight: '22px', 
            borderRadius: '50%', 
            fontSize: '.8em', 
            margin: '1.5px 0 1.5px 10px', 
            borderTop: '1px solid #ffffff88', 
            borderRight: '1px solid #ffffff88'
          }}>{transpose}</div>
          <div style={{display: 'flex', flexDirection: 'column', height: '26px', margin: '0 5px 0 5px'}}>
            <div className='transposeButton' onClick={() => setTranspose((t) => mod((t+1), 12))}>▴</div>
            <div className='transposeButton' onClick={() => setTranspose((t) => mod((t-1), 12))}>▾</div>
          </div>
        </div>
        <select 
          style={{
            height: '20px', 
            backgroundColor: '#333', 
            color: 'white', 
            borderRadius: '10px', 
            paddingLeft: '5px', 
            margin: '5px', 
            outline: 'none', 
            border: 'none'
          }} 
          value={modeTab} 
          onChange={(e: any) => setModeTab(e.target.value)}
        >
          { Object.keys(defModeRecipes).map(ms => <option key={'option-' + ms} value={ms}>{ms}</option>) }
        </select>
        <div 
          className='seventhButton'
          onClick={() => setSeventhEnabled((prev) => !prev)} 
          style={{border: seventhEnabled ? '2px solid transparent' : '2px solid #ddd', color: seventhEnabled ? '#ddd' : '#ddd', background: seventhEnabled ? '#333' : 'none'}}
        >
          7
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
    data: {chord, setFunc, index, origin: 'modeList', seventh: seventh},
  })

  const dragStyle = { opacity: isDragging ? '0' : '1' }

  return (
    <div style={dragStyle} ref={setNodeRef} {...attributes} {...listeners}>
      { seventh ? <NoteCardWide chord={chord}/> : <NoteCard chord={chord}/> }
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
    // <div className='headerRow'>      
    //   <span className='modeTag'>
    //     {[...scaleName].map((char: string) => (BravuraChars.includes(char)) 
    //       ? <span style={{fontFamily: 'Bravura', letterSpacing: '2px'}}>{char}</span> 
    //       : char
    //     )}
    //   </span>
    // </div>
    <td className='headerRow'>      
      <span className='modeTag'>
        {[...scaleName].map((char: string) => (BravuraChars.includes(char)) 
          ? <span style={{fontFamily: 'Bravura', letterSpacing: '2px'}}>{char}</span> 
          : char
        )}
      </span>
    </td>
  )
}

const ScaleRow = ({scaleName, scaleRecipe}: {scaleName: string, scaleRecipe: number[]}) => {

  const {seventh, ref} = useContext(ModeListContext);

  const [chords, setChords] = useState<Array<{id: string, root: string, type: {full: string, short: string, symbol: string}, num: string}> | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  useEffect(() => {

    try {

      let spellingPath: any;
      try {
        spellingPath = getSpellingPath(scaleRecipe);
      } catch (error) {
        throw new Error("An error occurred within the pitch spelling algorithm. [unknown]");
      };

      if (!spellingPath || spellingPath.length < scaleRecipe.length) {
        throw new Error("An error occurred within the pitch spelling algorithm. [premature end]");
      }

      if (seventh && scaleRecipe.length < 7) {
        throw new Error("Seventh chords impossible, scale shorter than seven notes.");
      }
    
      const chordsArray = scaleRecipe.map((x, i) => {
        const [rootX, rootY] = spellingPath[i];
        const root = combinedMatrix[rootX][rootY].char;
        const chordRecipe = Array.from({length: seventh ? 4 : 3 }, (_, j) => scaleRecipe[(i + 2*j) % scaleRecipe.length]);
        const type = chordIntervals[+getIntervalString(chordRecipe)];
        const offset = getOffset(x, ref!.numRef[i]);

        // console.log(root, type, offset);
        
        if (!root || !type) {
          throw new Error('An unknown error occurred identifying one or more chords.');
        }

        return {id: uuidv4(), root, type, num: String(offset)};
      });

      setChords(chordsArray);
    } catch (error: any) {
      setChords(undefined);
      setErrorMessage(error.message);
    }
    
  }, [scaleName, scaleRecipe, ref, seventh]);
  
  return (
    <td className='contentRow'>
      { 
        chords
        ? chords.map((chord, i) => <ChordDraggable key={chord.id} chord={chord} setFunc={setChords} index={i}/>)
        : <div 
            style={{
              width: '100%', 
              height: '30px', 
              lineHeight: '30px',
              borderRadius: '4px', 
              fontSize: '.8em', 
              backgroundColor: '#ffff00', 
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span style={{padding: '0 15px 0 10px'}}>⚠</span>
            {errorMessage}
            <span style={{padding: '0 10px 0 15px'}}>⚠</span>
          </div>
      }
    </td>
  )
}

const ModeListContext = createContext<{seventh: boolean, ref: {numRef: number[], numFunc: any} | undefined}>({seventh: true, ref: undefined});

export const ModeList = () => {

  const [modes, setModes] = useState<{[key: string]: number[]} | undefined>(undefined);
  const [transpose, setTranspose] = useState<number>(0);
  const [modeTab, setModeTab] = useState<string>(Object.keys(defModeRecipes)[0]);
  const [seventhEnabled, setSeventhEnabled] = useState<boolean>(true);

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

  const calcTransposedData = () => {
    const modeObj = defModeRecipes[modeTab];
    const transposedModeObj = transposeObj(modeObj, transpose);
    setModes(transposedModeObj);
    setNumRef(transposeRecipe(Object.values(defModeRecipes[refCoord[0]])[refCoord[1]], transpose));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { calcTransposedData() }, [modeTab, transpose, refCoord]);

  const [uniqueModeListId] = useState(uuidv4());
  const [hovered, setHovered] = useState(false);

  return (
    <ModeListContext.Provider value={{seventh: seventhEnabled, ref: {numRef: numRef, numFunc: setNumRef}}}>
      <div style={{width: 'min-content'}}>
        <SettingsBar settingValues={[transpose, modeTab, seventhEnabled]} settingFunctions={[setTranspose, setModeTab, setSeventhEnabled]}/>
        <div className='componentWrapper'>
          <div className='backdrop blur'/>
          { 
            modes ? (
              <table cellPadding="0" style={{borderCollapse: "collapse", width: "max-content"}}>
                {
                  Object.entries(modes).map(([modeName, recipe], modeIndex) => (
                    <tr style={{position: "relative"}}>
                      <div
                        className="reference"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{opacity: hovered ? 1 : 0.5}}
                      >
                        <div 
                          className={
                            (modeTab === refCoord[0] && modeIndex === refCoord[1]) 
                            ? "reference__marker reference__marker--selected" 
                            : "reference__marker reference__marker--unselected"
                          }
                          onClick={() => setRefCoord([modeTab, modeIndex])}
                        />
                      </div>
                      <td style={{height: "50px"}}>
                        <ScaleHeader key={`${uniqueModeListId}-H${modeIndex}`} scaleName={modeName} scaleRecipe={recipe}/>
                      </td>
                      <td style={{height: "50px"}}>
                        <ScaleRow    key={`${uniqueModeListId}-R${modeIndex}`} scaleName={modeName} scaleRecipe={recipe}/>
                      </td>
                    </tr>
                  ))
                }
              </table>
            ) : <div style={{width: '350px', fontSize: '.8em', textAlign: 'center', padding: '10px'}}>LOADING...</div>
          }
        </div>
      </div>
    </ModeListContext.Provider>
  );
}

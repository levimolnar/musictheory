import './Chart.css';

const defaultScales = { 
  // diatonic (natural) modes:
  Lydian:     [0,2,4,6,7,9,11], 
  Ionian:     [0,2,4,5,7,9,11], 
  Mixolydian: [0,2,4,5,7,9,10], 
  Dorian:     [0,2,3,5,7,9,10], 
  Aeolian:    [0,2,3,5,7,8,10], 
  Phrygian:   [0,1,3,5,7,8,10], 
  Locrian:    [0,1,3,5,6,8,10],
}

const exampleOutput = {
  lydian:     [{char: 'C', type: 'maj', num: 'I'}, {char: 'D', type: 'maj', num: 'II'}, {char: 'E', type: 'min', num: 'iii'}, {char: 'F♯', type: 'dim', num: 'iv°'}, {char: 'G', type: 'maj', num: 'V'}, {char: 'A', type: 'min', num: 'vi'}, {char: 'B', type: 'min', num: 'vii'}], 
  ionian:     [{char: 'C', type: 'maj', num: 'I'}, {char: 'D', type: 'min', num: 'ii'}, {char: 'E', type: 'min', num: 'iii'}, {char: 'F', type: 'maj', num: 'IV'}, {char: 'G', type: 'maj', num: 'V'}, {char: 'A', type: 'min', num: 'vi'}, {char: 'B', type: 'dim', num: 'vii°'}], 
  mixolydian: [{char: 'C', type: 'maj', num: 'I'}, {char: 'D', type: 'min', num: 'ii'}, {char: 'E', type: 'dim', num: 'iii°'}, {char: 'F', type: 'maj', num: 'IV'}, {char: 'G', type: 'min', num: 'v'}, {char: 'A', type: 'min', num: 'vi'}, {char: 'B♭', type: 'maj', num: 'VII'}], 
  dorian:     [{char: 'C', type: 'min', num: 'i'}, {char: 'D', type: 'min', num: 'ii'}, {char: 'E♭', type: 'maj', num: 'III'}, {char: 'F', type: 'maj', num: 'IV'}, {char: 'G', type: 'min', num: 'v'}, {char: 'A', type: 'dim', num: 'vi°'}, {char: 'B♭', type: 'maj', num: 'VII'}], 
  aeolian:    [{char: 'C', type: 'min', num: 'i'}, {char: 'D', type: 'dim', num: 'ii°'}, {char: 'E♭', type: 'maj', num: 'III'}, {char: 'F', type: 'min', num: 'iv'}, {char: 'G', type: 'min', num: 'v'}, {char: 'A♭', type: 'maj', num: 'VI'}, {char: 'B♭', type: 'maj', num: 'VII'}], 
  phrygian:   [{char: 'C', type: 'min', num: 'i'}, {char: 'D♭', type: 'maj', num: 'II'}, {char: 'E♭', type: 'maj', num: 'III'}, {char: 'F', type: 'min', num: 'iv'}, {char: 'G', type: 'dim', num: 'v°'}, {char: 'A♭', type: 'maj', num: 'VI'}, {char: 'B♭', type: 'min', num: 'vii'}], 
  locrian:    [{char: 'C', type: 'dim', num: 'i°'}, {char: 'D♭', type: 'maj', num: 'II'}, {char: 'E♭', type: 'min', num: 'iii'}, {char: 'F', type: 'min', num: 'iv'}, {char: 'G♭', type: 'maj', num: 'V'}, {char: 'A♭', type: 'maj', num: 'VI'}, {char: 'B♭', type: 'min', num: 'vii'}], 
}

const ScaleHeader = ({text}: {text: string}) => (
  <div className='headerRow'>
    <span className='modeTag'>{text}</span>
  </div>
)

const ScaleRow = ({array}: {array: Array<{char: string, type: string, num: string}>}) => (
  <div className='contentRow'>
    { 
      array.map(chord => (
        <div className='card'>
          <div className={'cardContent ' + chord.type} >
            <div className='cardNumber'>{chord.num}</div>
            <div className='cardText'>{chord.char[0]}<span className='accidental'>{chord.char[1]}</span></div>
          </div>
          <div className='cardShadow' />
        </div>
      )) 
    }
  </div>
)

export const Chart = () => {
  return (
    <div className='chart blur'>
      <div className='chartHeaders'>
        { Object.keys(exampleOutput).map(scaleName => <ScaleHeader text={scaleName} />) }
      </div>
      <div className='chartContent'>
        { Object.values(exampleOutput).map(scaleChars => <ScaleRow array={scaleChars} />) }

        {/* <div className='contentRow'>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>I</div>
              <div className='cardText'>C</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>II</div>
              <div className='cardText'>D</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>iii</div>
              <div className='cardText'>E</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent dim'>
              <div className='cardNumber'>iv°</div>
              <div className='cardText'>F<span className='accidental'>#</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>V</div>
              <div className='cardText'>G</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>vi</div>
              <div className='cardText'>A</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>vii</div>
              <div className='cardText'>B</div>
            </div>
            <div className='cardShadow' />
          </div>
        </div>
        <div className='contentRow'>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>I</div>
              <div className='cardText'>C</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>ii</div>
              <div className='cardText'>D</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>iii</div>
              <div className='cardText'>E</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>IV</div>
              <div className='cardText'>F</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>V</div>
              <div className='cardText'>G</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>vi</div>
              <div className='cardText'>A</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent dim'>
              <div className='cardNumber'>vii°</div>
              <div className='cardText'>B</div>
            </div>
            <div className='cardShadow' />
          </div>
        </div>
        <div className='contentRow'>
        <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>I</div>
              <div className='cardText'>C</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>ii</div>
              <div className='cardText'>D</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent dim'>
              <div className='cardNumber'>iii°</div>
              <div className='cardText'>E</div>
            </div>            
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>IV</div>
              <div className='cardText'>F</div>
            </div>
          <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>v</div>
              <div className='cardText'>G</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
          <div className='cardContent min'>
            <div className='cardNumber'>vi</div>
            <div className='cardText'>A</div>
          </div>
          <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>VII</div>
              <div className='cardText'>B<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
        </div>
        <div className='contentRow'>
        <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>i</div>
              <div className='cardText'>C</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>ii</div>
              <div className='cardText'>D</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>III</div>
              <div className='cardText'>E<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>IV</div>
              <div className='cardText'>F</div>
            </div>
          <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>v</div>
              <div className='cardText'>G</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
          <div className='cardContent dim'>
            <div className='cardNumber'>vi°</div>
            <div className='cardText'>A</div>
          </div>
          <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>VII</div>
              <div className='cardText'>B<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
        </div>
        <div className='contentRow'>
        <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>i</div>
              <div className='cardText'>C</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent dim'>
              <div className='cardNumber'>ii°</div>
              <div className='cardText'>D</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>III</div>
              <div className='cardText'>E<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>iv</div>
              <div className='cardText'>F</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>v</div>
              <div className='cardText'>G</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>VI</div>
              <div className='cardText'>A<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>VII</div>
              <div className='cardText'>B<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
        </div>
        <div className='contentRow'>
        <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>i</div>
              <div className='cardText'>C</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>II</div>
              <div className='cardText'>D<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>III</div>
              <div className='cardText'>E<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>iv</div>
              <div className='cardText'>F</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
          <div className='cardContent dim'>
            <div className='cardNumber'>v°</div>
            <div className='cardText'>G</div>
          </div>
          <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>VI</div>
              <div className='cardText'>A<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>vii</div>
              <div className='cardText'>B<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
        </div>
        <div className='contentRow'>
        <div className='card'>
            <div className='cardContent dim'>
              <div className='cardNumber'>i°</div>
              <div className='cardText'>C</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>II</div>
              <div className='cardText'>D<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>iii</div>
              <div className='cardText'>E<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>iv</div>
              <div className='cardText'>F</div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
          <div className='cardContent maj'>
              <div className='cardNumber'>V</div>
              <div className='cardText'>G<span className='accidental'>b</span></div>
          </div>
          <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent maj'>
              <div className='cardNumber'>VI</div>
              <div className='cardText'>A<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
          <div className='card'>
            <div className='cardContent min'>
              <div className='cardNumber'>vii</div>
              <div className='cardText'>B<span className='accidental'>b</span></div>
            </div>
            <div className='cardShadow' />
          </div>
        </div> */}
      </div>
    </div>
  );
}

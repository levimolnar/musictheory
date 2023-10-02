import './Chart.css';

export const Chart = () => {
  return (
    <div className='chart blur'>
      <div className='chartHeaders'>
        <div className='headerRow'>
          <span className='modeTag'>lydian</span>
        </div>
        <div className='headerRow'>
          <span className='modeTag'>ionian</span>
        </div>
        <div className='headerRow'>
          <span className='modeTag'>mixolydian</span>
        </div>
        <div className='headerRow'>
          <span className='modeTag'>dorian</span>
        </div>
        <div className='headerRow'>
          <span className='modeTag'>aeolian</span>
        </div>
        <div className='headerRow'>
          <span className='modeTag'>phrygian</span>
        </div>
        <div className='headerRow'>
          <span className='modeTag'>locrian</span>
        </div>
      </div>
      <div className='chartContent'>
        <div className='contentRow'>
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
        </div>
      </div>
    </div>
  );
}

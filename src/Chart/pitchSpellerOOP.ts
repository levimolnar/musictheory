import { v4 as uuidv4 } from 'uuid';
import { chordIntervals } from './chordIntervals';

const numberMatrix: Array<{[key: number]: number}> = [
  {[-2]: 10, [-1]: 11, 0:  0, 1:  1, 2:  2},
  {[-2]:  0, [-1]:  1, 0:  2, 1:  3, 2:  4},
  {[-2]:  2, [-1]:  3, 0:  4, 1:  5, 2:  6},
  {[-2]:  3, [-1]:  4, 0:  5, 1:  6, 2:  7},
  {[-2]:  5, [-1]:  6, 0:  7, 1:  8, 2:  9},
  {[-2]:  7, [-1]:  8, 0:  9, 1: 10, 2: 11},
  {[-2]:  9, [-1]: 10, 0: 11, 1:  0, 2:  1},
]

const characterMatrix: Array<{[key: number]: string}> = [
  {[-2]: 'C\uED64', [-1]: 'C\uED60', 0: 'C', 1: 'C\uED62', 2: 'C\uED63'},
  {[-2]: 'D\uED64', [-1]: 'D\uED60', 0: 'D', 1: 'D\uED62', 2: 'D\uED63'},
  {[-2]: 'E\uED64', [-1]: 'E\uED60', 0: 'E', 1: 'E\uED62', 2: 'E\uED63'},
  {[-2]: 'F\uED64', [-1]: 'F\uED60', 0: 'F', 1: 'F\uED62', 2: 'F\uED63'},
  {[-2]: 'G\uED64', [-1]: 'G\uED60', 0: 'G', 1: 'G\uED62', 2: 'G\uED63'},
  {[-2]: 'A\uED64', [-1]: 'A\uED60', 0: 'A', 1: 'A\uED62', 2: 'A\uED63'},
  {[-2]: 'B\uED64', [-1]: 'B\uED60', 0: 'B', 1: 'B\uED62', 2: 'B\uED63'},
]

const positions: Array<Array<[number, number]>> = [
  [[0, 0], [6, 1], [1,-2]],
  [[1,-1], [0, 1], [6, 2]],
  [[1, 0], [2,-2], [0, 2]],
  [[2,-1], [1, 1], [3,-2]],
  [[2, 0], [3,-1], [1, 2]],
  [[3, 0], [2, 1], [4,-2]],
  [[4,-1], [3, 1], [2, 2]],
  [[4, 0], [5,-2], [3, 2]],
  [[5,-1], [4, 1]],
  [[5, 0], [6,-2], [4, 2]],
  [[6,-1], [5, 1], [0,-2]],
  [[6, 0], [0,-1], [5, 2]],
]

export class ModeList {
  modes: Array<any>
  transpose: number;

  constructor(modeObj: {[key: string]: number[]} = {}, transpose: number = 0) {
    this.modes = [];
    this.transpose = transpose;
    Object.entries(modeObj).forEach(([name, recipe]) => this.addMode(name, recipe));
  }

  addMode(modeName: string, modeRecipe: number[]) {
    const transposedRecipe = Array.from(modeRecipe, (i) => (i + this.transpose) % 12);
    this.modes.push(new Mode(modeName, transposedRecipe));
  }

  // getListData() {
  //   console.log(this.modes);
  // }
}

class Mode {
  name: string;
  // length: number;
  chords: Array<Object>;

  // constructor(modeName: string, modeRecipe: number[], startingCoords: Array<[number, number]>) {
  constructor(modeName: string, modeRecipe: number[]) {  
    this.name = modeName;
    // this.length = modeRecipe.length;
    this.chords = [];

    // 01: FIND SPELLING WITH LEAST ACCIDENTALS USED
    const spellingPath = this.getSpellingPath(modeRecipe);

    // 02: FIND INTERVALS THAT MAKE UP CHORDS
    const intervalStrings = this.getIntervalStrings(modeRecipe, 4);

    // 03: ADD CHORD OBJECTS
    for (let i = 0; i < modeRecipe.length; i++) {
      const [x, y] = spellingPath[i];
      this.chords.push(new Chord(characterMatrix[x][y], intervalStrings[i]));
    };
  }

  getSpellingPath(recipe: number[]) {
    const startingCoords = positions[recipe[0]];

    let best: {spellingPath: Array<[number, number]>, accidentalCount: number} = {spellingPath: [], accidentalCount: Infinity};

    startingCoords.forEach(([startX, _], i) => {
      const xArray = Array.from({length: recipe.length}, (_, i) => (startX + i) % (recipe.length));
      let current: {spellingPath: Array<[number, number]>, accidentalCount: number} = {spellingPath: [], accidentalCount: 0};

      for (let [j, x] of Object.entries(xArray)) {
        const match = Object.entries(numberMatrix[x]).find(([_, number]) => number === recipe[+j]);
        if (match) {
          const [y] = match;
          current.spellingPath.push([x, +y]);
          current.accidentalCount += Math.abs(+y);
        } else {
          current.accidentalCount = Infinity;
          break;
        };
      }

      if (current.accidentalCount < best.accidentalCount) { best = {...current} };
    }); 

    return best.spellingPath;
  };

  getIntervalStrings(recipe: number[], chordLength: number) {
    const normalizeNote = (n: number) => (n % 12 + 12) % 12;

    let intervalStrings = [];

    for (let i = 0; i < recipe.length; i++) {

      let string = "";

      for (let j = 0; j < (chordLength - 1); j++) {
        const note1 = recipe[(i + 2*j) % recipe.length];
        const note2 = recipe[(i + 2*(j+1)) % recipe.length];
        const interval = normalizeNote(note2 - note1);
        string += String(interval);
      };

      intervalStrings.push(string);
    }

    return intervalStrings;
  };

  // addChord() { this.chords.push(new Chord()) }
}

class Chord {
  id: string;
  root: string;
  type: {
    full: string,
    short: string,
    symbol: string,
  };
  numeral: undefined;

  constructor(root: string, intervalString: string) {
    this.id = uuidv4();
    this.root = root;
    this.type = this.lookupChordType(intervalString);
    this.numeral = undefined;
  }

  lookupChordType(intervalString: string) { return chordIntervals[+intervalString] }
  resetId() { this.id = uuidv4() };
}

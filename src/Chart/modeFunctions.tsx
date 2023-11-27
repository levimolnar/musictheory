import { numberMatrix, positions } from "./modeData";

export const getSpellingPath = (recipe: number[]) => {
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
}

export const getIntervalStrings = (recipe: number[], chordLength: number) => {
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
}

export const getNumerals = (recipe: number[], reference: number[]) => {
  // C lydian:
  // 0  2  4  5  7  9  11
  // 0  2  4  6  7  8  10
  // 0  0  0  1  0  0  0

  // C mixolydian:
  // 0  2  4  5  7  9  11
  // 0  2  4  5  7  9  10
  // 0  0  0  0  0  0 -1

  // F lydian:
  // 6  8  10 11 1  3  5
  // 6  8  10 0  1  3  5
  // 0  0  0 -11 0  0  0   ==>   0  0  0  1  0  0  0   

  // Db mixolydian:
  // 1  3  5  6  8  10 0
  // 1  3  5  6  8  10 11
  // 0  0  0  0  0  0  11  ==>   0  0  0  0  0  0 -1

  const transformNumber = (x: number) => (Math.abs(x) <= 6) ? x : x + ((x > 0) ? -12 : 12);

  // console.log( 1, transformNumber( 1 ));
  // console.log(-1, transformNumber(-1 ));
  // console.log( 1, transformNumber(-11));
  // console.log(-1, transformNumber( 11));
  // console.log( 2, transformNumber(-10));
  // console.log(-2, transformNumber( 10));

  const numerals = recipe.map((_, i) => transformNumber(recipe[i] - reference[i]));
  return numerals;
}
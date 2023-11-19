import { v4 as uuidv4 } from 'uuid';
import { chordIntervals } from './chordIntervals';

const noteMatrix: Array<Array<{'number': number, 'char': string}>> = [
  [{'number': 10,'char': 'C\uED64'}, {'number': 11,'char': 'C\uED60'}, {'number': 0, 'char': 'C'}, {'number': 1, 'char': 'C\uED62'}, {'number': 2, 'char': 'C\uED63'}],
  [{'number': 0, 'char': 'D\uED64'}, {'number': 1, 'char': 'D\uED60'}, {'number': 2, 'char': 'D'}, {'number': 3, 'char': 'D\uED62'}, {'number': 4, 'char': 'D\uED63'}],
  [{'number': 2, 'char': 'E\uED64'}, {'number': 3, 'char': 'E\uED60'}, {'number': 4, 'char': 'E'}, {'number': 5, 'char': 'E\uED62'}, {'number': 6, 'char': 'E\uED63'}],
  [{'number': 3, 'char': 'F\uED64'}, {'number': 4, 'char': 'F\uED60'}, {'number': 5, 'char': 'F'}, {'number': 6, 'char': 'F\uED62'}, {'number': 7, 'char': 'F\uED63'}],
  [{'number': 5, 'char': 'G\uED64'}, {'number': 6, 'char': 'G\uED60'}, {'number': 7, 'char': 'G'}, {'number': 8, 'char': 'G\uED62'}, {'number': 9, 'char': 'G\uED63'}],
  [{'number': 7, 'char': 'A\uED64'}, {'number': 8, 'char': 'A\uED60'}, {'number': 9, 'char': 'A'}, {'number': 10,'char': 'A\uED62'}, {'number': 11,'char': 'A\uED63'}],
  [{'number': 9, 'char': 'B\uED64'}, {'number': 10,'char': 'B\uED60'}, {'number': 11,'char': 'B'}, {'number': 0, 'char': 'B\uED62'}, {'number': 1, 'char': 'B\uED63'}],
]

const positions: Array<Array<[number, number]>> = [
  [[0,2], [6,3], [1,0]],
  [[1,1], [0,3], [6,4]],
  [[1,2], [2,0], [0,4]],
  [[2,1], [1,3], [3,0]],
  [[2,2], [3,1], [1,4]],
  [[3,2], [2,3], [4,0]],
  [[4,1], [3,3], [2,4]],
  [[4,2], [5,0], [3,4]],
  [[5,1], [4,3]],
  [[5,2], [6,0], [4,4]],
  [[6,1], [5,3], [0,0]],
  [[6,2], [0,1], [5,4]],
]

// Function transforms y-index in matrix to degree of accidental. e.g. [0,1,2,3,4] -> [2,1,0,1,2]
const accTransform = (a: number) => Math.abs(a-2);

const getChordType = (arr: number[], i: number) => {
  
  const negativeFix = (n: number) => (Math.sign(n) === -1) ? n += 12 : n

  const interval1 = negativeFix(arr[(i+2) % arr.length] - arr[i]);
  const interval2 = negativeFix(arr[(i+4) % arr.length] - arr[(i+2) % arr.length]);
  const interval3 = negativeFix(arr[(i+6) % arr.length] - arr[(i+4) % arr.length]);
  const intHash = Number("" + interval1 + interval2 + interval3);

  // const interval1 = negativeFix(arr[(i+2) % arr.length] - arr[i]);
  // const interval2 = negativeFix(arr[(i+4) % arr.length] - arr[(i+2) % arr.length]);
  // const intHash = Number("" + interval1 + interval2);

  console.log(chordIntervals[intHash]);
  return chordIntervals[intHash] ? chordIntervals[intHash] : "unknown";

  // if (interval1 === 3) {
  //   if (interval2 === 3) return "dim"
  //   if (interval2 === 4) return "min"
  //   else return "unknown"
  // } else if (interval1 === 4) {
  //   if (interval2 === 3) return "maj"
  //   if (interval2 === 4) return "aug"
  //   else return "unknown"
  // } else return "unknown"
}

const getNumeral = (type: string | undefined, i: number) => {
  if (!type) return ""

  const numeral = ["i", "ii", "iii", "iv", "v", "vi", "vii"]

  if (type === "dim") return numeral[i] + "o"
  if (type === "min") return numeral[i]
  if (type === "maj") return numeral[i].toUpperCase()
  if (type === "aug") return numeral[i].toUpperCase() + "+"
}

export const pitchSpeller = (scales: {[key: string]: number[]}, transpose: number) => {
  /*
  Function returns correct character set for scale degree array. Only accepts heptatonic scales.
  in: {'scaleName': [0,2,4,5,7,9,11]} -> out: {'scaleName': [{char: 'C', type: 'maj', num: 'I'}, {char: 'D', type: 'maj', num: 'II'}, ...]}
  */

  const outputArray: any = {}

  Object.keys(scales).forEach(scaleName => {
    const startPositions = positions[(scales[scaleName][0] + Number(transpose)) % 12]
    const scaleLength = scales[scaleName].length

    var lowestCount = 999
    var winner = undefined

    for (let i = 0; i < startPositions.length; i++) {
      const [sx, sy] = startPositions[i]

      // Starting scale with a double accidental would be very unusual.
      // Skipping third starting coord may safe a small bit of time.
      // if (i > 1) break  

      const chordTypes = []

      for (let j = 0; j < scaleLength; j++) {
        const chordType = getChordType(scales[scaleName], j)
        chordTypes.push({type: chordType, num: getNumeral(chordType, j)})
      }

      const resultArray = []
      var accidentalCount = 0

      for (let j = 0; j < scaleLength; j++) {

        if (!j) {
          resultArray.push({"id": uuidv4(), "char": noteMatrix[sx][sy]['char'], "type": chordTypes[j].type, "num": chordTypes[j].num})
          accidentalCount += accTransform(sy)
          continue
        }
        
        const x = (j+sx)%scaleLength
        const matrixY = noteMatrix[x].map(obj => obj.number)
        const transposedNote = (scales[scaleName][j] + Number(transpose)) % 12
        const indexY = matrixY.indexOf(transposedNote)

        if (indexY === -1) {
          accidentalCount = 999
          break
        } 
        resultArray.push({"id": uuidv4(), "char": noteMatrix[x][indexY].char, "type": chordTypes[j].type, "num": chordTypes[j].num})
        accidentalCount += accTransform(indexY)
      }

      if (accidentalCount < lowestCount) {
        lowestCount = accidentalCount
        winner = resultArray
      }
    }
    outputArray[scaleName] = winner
  })

  return outputArray
}
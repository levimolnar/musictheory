import { v4 as uuidv4 } from 'uuid';

const noteMatrix: Array<Array<{'number': number, 'char': string}>> = [
  [{'number': 10,'char': 'C𝄫'}, {'number': 11,'char': 'C♭'}, {'number': 0, 'char': 'C'}, {'number': 1, 'char': 'C♯'}, {'number': 2, 'char': 'C𝄪'}],
  [{'number': 0, 'char': 'D𝄫'}, {'number': 1, 'char': 'D♭'}, {'number': 2, 'char': 'D'}, {'number': 3, 'char': 'D♯'}, {'number': 4, 'char': 'D𝄪'}],
  [{'number': 2, 'char': 'E𝄫'}, {'number': 3, 'char': 'E♭'}, {'number': 4, 'char': 'E'}, {'number': 5, 'char': 'E♯'}, {'number': 6, 'char': 'E𝄪'}],
  [{'number': 3, 'char': 'F𝄫'}, {'number': 4, 'char': 'F♭'}, {'number': 5, 'char': 'F'}, {'number': 6, 'char': 'F♯'}, {'number': 7, 'char': 'F𝄪'}],
  [{'number': 5, 'char': 'G𝄫'}, {'number': 6, 'char': 'G♭'}, {'number': 7, 'char': 'G'}, {'number': 8, 'char': 'G♯'}, {'number': 9, 'char': 'G𝄪'}],
  [{'number': 7, 'char': 'A𝄫'}, {'number': 8, 'char': 'A♭'}, {'number': 9, 'char': 'A'}, {'number': 10,'char': 'A♯'}, {'number': 11,'char': 'A𝄪'}],
  [{'number': 9, 'char': 'B𝄫'}, {'number': 10,'char': 'B♭'}, {'number': 11,'char': 'B'}, {'number': 0, 'char': 'B♯'}, {'number': 1, 'char': 'B𝄪'}],
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

const accTransform = (a: number) => {
  // Function transforms y-index in matrix to degree of accidental. e.g. [0,1,2,3,4] -> [2,1,0,1,2]
  return Math.abs(a-2)
}

const getChordType = (arr: number[], i: number) => {
  
  const negativeFix = (n: number) => (Math.sign(n) === -1) ? n += 12 : n

  var int1 = negativeFix(arr[(i+2) % arr.length] - arr[i])
  var int2 = negativeFix(arr[(i+4) % arr.length] - arr[(i+2) % arr.length])

  if (int1 === 3) {
    if (int2 === 3) return "dim"
    if (int2 === 4) return "min"
    else return "unknown"
  } else if (int1 === 4) {
    if (int2 === 3) return "maj"
    if (int2 === 4) return "aug"
    else return "unknown"
  } else return "unknown"
}

const getNumeral = (type: string | undefined, i: number) => {
  if (!type) return ""

  const numeral = ["i", "ii", "iii", "iv", "v", "vi", "vii"]

  if (type === "dim") return numeral[i] + "o"  // + "ᴼ"
  if (type === "min") return numeral[i]
  if (type === "maj") return numeral[i].toUpperCase()
  if (type === "aug") return numeral[i].toUpperCase() + "+"  // + "⁺"
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
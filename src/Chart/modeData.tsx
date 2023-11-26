// BRAVURA SYMBOL LIST:
// - flat:              \uED60
// - natural:           \uED61
// - sharp:             \uED62
// - double sharp:      \uED63
// - double flat:       \uED64
// - half-diminished 7: \uF4D7
// - diminished 7:      \uF4D8
// - augmented 7:       \uF4D9
// - major 7:           \uF4DA

// object with scale recipes (ordered by brightness)
export const defModeRecipes: {[modeSetName: string]: {[modeName: string]: number[]}} = { 
  "Diatonic": {
    "lydian":               [0,2,4,6,7,9,11], 
    "ionian":               [0,2,4,5,7,9,11], 
    "mixolydian":           [0,2,4,5,7,9,10], 
    "dorian":               [0,2,3,5,7,9,10], 
    "aeolian":              [0,2,3,5,7,8,10], 
    "phrygian":             [0,1,3,5,7,8,10], 
    "locrian":              [0,1,3,5,6,8,10],
  },
  "Harm. Minor": {                             // AEOLIAN WITH SHARP 7
    "lydian \uED622":       [0,3,4,6,7,9,11],
    "ionian \uED625":       [0,2,4,5,8,9,11],
    "altered \uED647":      [0,1,3,4,6,8,9 ],  // SHARP 1
    "ukr. dorian":          [0,2,3,6,7,9,10],
    "harm. minor":          [0,2,3,5,7,8,11], 
    "phrygian dom.":        [0,1,4,5,7,8,10],
    "locrian \uED616":      [0,1,3,5,6,9,10],
  },
  "Harm. Major": {                             // IONIAN WITH FLAT 6
    "lydian \uED603":       [0,2,3,6,7,9,11],
    "harm. major":          [0,2,4,5,7,8,11],
    "mixolydian \uED602":   [0,1,4,5,7,9,10],
    "dorian \uED605":       [0,2,3,5,6,9,10],
    "lydian aug. \uED622":  [0,3,4,6,8,9,11],  // FLAT 1
    "phrygian \uED604":     [0,1,3,4,7,8,10],
    "locrian \uED647":      [0,1,3,5,6,8,9 ],
  },
  "Jazz Minor": {                              // AEOLIAN WITH SHARP 6 AND SHARP 7
    "locrian \uED612":      [0,2,3,5,6,8,10],  // SHARP 1
    "lydian aug.":          [0,2,4,6,8,9,11],
    "altered":              [0,1,3,4,6,8,10],  // SHARP 1
    "mixolydian \uED624":   [0,2,4,6,7,9,10],
    "jazz minor":           [0,2,3,5,7,9,11],
    "aeolian dom.":         [0,2,4,5,7,8,10],
    "phrygian \uED616":     [0,1,3,5,7,9,10],
  },
  "Other": {
    "whole-tone":           [0,2,4,6,8,10],
    // "major blues":          [0,2,3,4,7,9],
    // "minor blues":          [0,3,5,6,7,10],
    // "pentatonic":           [0,2,4,7,9],
    // "diminished":           [0,2,3,5,6,8,9,11],
    // "chromatic":            [0,1,2,3,4,5,6,7,8,9,10,11],
  }
}

export const chordIntervals: {[key: number]: {full: string, short: string, symbol: string}} = {
  33:  {full: "Diminished",              short: "dim",     symbol: "\uE870"  },
  34:  {full: "Minor",                   short: "min",     symbol: "m"       },
  43:  {full: "Major",                   short: "maj",     symbol: ""       },
  44:  {full: "Augmented",               short: "aug",     symbol: "+"       },
  333: {full: "Diminished seventh",      short: "dim7",    symbol: "\uE8707" },
  334: {full: "Half-diminished seventh", short: "hdim7",   symbol: "\uE8717" },
  343: {full: "Minor seventh",           short: "min7",    symbol: "m7"      },
  344: {full: "Minor major seventh",     short: "minmaj7", symbol: "mM7"     },
  433: {full: "Dominant seventh",        short: "dom7",    symbol: "7"       },
  434: {full: "Major seventh",           short: "maj7",    symbol: "M7"      },
  442: {full: "Augmented seventh",       short: "aug7",    symbol: "+7"      },
  443: {full: "Augmented major seventh", short: "augmaj7", symbol: "+M7"     },
  444: {full: "Augmented",               short: "aug",     symbol: "+"       },
}

export const numberMatrix: Array<{[key: number]: number}> = [
  {[-2]: 10, [-1]: 11, 0:  0, 1:  1, 2:  2},
  {[-2]:  0, [-1]:  1, 0:  2, 1:  3, 2:  4},
  {[-2]:  2, [-1]:  3, 0:  4, 1:  5, 2:  6},
  {[-2]:  3, [-1]:  4, 0:  5, 1:  6, 2:  7},
  {[-2]:  5, [-1]:  6, 0:  7, 1:  8, 2:  9},
  {[-2]:  7, [-1]:  8, 0:  9, 1: 10, 2: 11},
  {[-2]:  9, [-1]: 10, 0: 11, 1:  0, 2:  1},
]

export const characterMatrix: Array<{[key: number]: string}> = [
  {[-2]: 'C\uED64', [-1]: 'C\uED60', 0: 'C', 1: 'C\uED62', 2: 'C\uED63'},
  {[-2]: 'D\uED64', [-1]: 'D\uED60', 0: 'D', 1: 'D\uED62', 2: 'D\uED63'},
  {[-2]: 'E\uED64', [-1]: 'E\uED60', 0: 'E', 1: 'E\uED62', 2: 'E\uED63'},
  {[-2]: 'F\uED64', [-1]: 'F\uED60', 0: 'F', 1: 'F\uED62', 2: 'F\uED63'},
  {[-2]: 'G\uED64', [-1]: 'G\uED60', 0: 'G', 1: 'G\uED62', 2: 'G\uED63'},
  {[-2]: 'A\uED64', [-1]: 'A\uED60', 0: 'A', 1: 'A\uED62', 2: 'A\uED63'},
  {[-2]: 'B\uED64', [-1]: 'B\uED60', 0: 'B', 1: 'B\uED62', 2: 'B\uED63'},
]

export const positions: Array<Array<[number, number]>> = [
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
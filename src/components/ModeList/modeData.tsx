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
    "major blues":          [0,2,3,4,7,9 ],
    "minor blues":          [0,3,5,6,7,10],
    "pentatonic":           [0,2,4,7,9],
    "diminished":           [0,2,3,5,6,8,9,11],
    "chromatic":            [0,1,2,3,4,5,6,7,8,9,10,11],
  }
};

// export const chordIntervals: {[key: number]: {full: string, short: string, symbol: string}} = {
//   33:  {full: "Diminished",              short: "dim",     symbol: "\uE870"  },
//   34:  {full: "Minor",                   short: "min",     symbol: "m"       },
//   43:  {full: "Major",                   short: "maj",     symbol: ""        },
//   44:  {full: "Augmented",               short: "aug",     symbol: "+"       },
//   333: {full: "Diminished seventh",      short: "dim7",    symbol: "\uE8707" },
//   334: {full: "Half-diminished seventh", short: "hdim7",   symbol: "\uE8717" },
//   343: {full: "Minor seventh",           short: "min7",    symbol: "m7"      },
//   344: {full: "Minor major seventh",     short: "minmaj7", symbol: "mM7"     },
//   433: {full: "Dominant seventh",        short: "dom7",    symbol: "7"       },
//   434: {full: "Major seventh",           short: "maj7",    symbol: "M7"      },
//   442: {full: "Augmented seventh",       short: "aug7",    symbol: "+7"      },
//   443: {full: "Augmented major seventh", short: "augmaj7", symbol: "+M7"     },
//   444: {full: "Augmented",               short: "aug",     symbol: "+"       },
// };

export const chordIntervals: {[key: number]: {full: string, short: string, symbol: string}} = {
  25:  {full: "Suspended second",                           short: "unmarked", symbol: "sus2"    },
  52:  {full: "Suspended fourth",                           short: "unmarked", symbol: "sus4"    },
  55:  {full: "Quartal",                                    short: "unmarked", symbol: "q4"      },
  77:  {full: "Quintal",                                    short: "unmarked", symbol: "q5"      },
  33:  {full: "Diminished",                                 short: "dim",      symbol: "\uE870"  },
  36:  {full: "Diminished (first inversion)",               short: "dim",      symbol: "\uE870"  },
  63:  {full: "Diminished (second inversion)",              short: "dim",      symbol: "\uE870"  },
  34:  {full: "Minor",                                      short: "min",      symbol: "m"       },
  45:  {full: "Minor (first inversion)",                    short: "min",      symbol: "m"       },
  53:  {full: "Minor (second inversion)",                   short: "min",      symbol: "m"       },
  43:  {full: "Major",                                      short: "maj",      symbol: ""        },
  35:  {full: "Major (first inversion)",                    short: "maj",      symbol: ""        },
  54:  {full: "Major (second inversion)",                   short: "maj",      symbol: ""        },
  44:  {full: "Augmented",                                  short: "aug",      symbol: "+"       },
  333: {full: "Diminished seventh",                         short: "dim7",     symbol: "\uE8707" },
  334: {full: "Half-diminished seventh",                    short: "hdim7",    symbol: "\uE8717" },
  342: {full: "Half-diminished seventh (first inversion)",  short: "hdim7",    symbol: "\uE8717" },
  423: {full: "Half-diminished seventh (second inversion)", short: "hdim7",    symbol: "\uE8717" },
  233: {full: "Half-diminished seventh (third inversion)",  short: "hdim7",    symbol: "\uE8717" },
  343: {full: "Minor seventh",                              short: "min7",     symbol: "m7"      },
  432: {full: "Minor seventh (first inversion)",            short: "min7",     symbol: "m7"      },
  323: {full: "Minor seventh (second inversion)",           short: "min7",     symbol: "m7"      },
  234: {full: "Minor seventh (third inversion)",            short: "min7",     symbol: "m7"      },
  344: {full: "Minor major seventh",                        short: "minmaj7",  symbol: "mM7"     },
  433: {full: "Dominant seventh",                           short: "dom7",     symbol: "7"       },
  434: {full: "Major seventh",                              short: "maj7",     symbol: "M7"      },
  442: {full: "Augmented seventh",                          short: "aug7",     symbol: "+7"      },
  443: {full: "Augmented major seventh",                    short: "augmaj7",  symbol: "+M7"     },
  // 444: {full: "Augmented",                                  short: "aug",     symbol: "+"       }, 
};

export const combinedMatrix: Array<{[key: number]: {num: number, char: string}}> = [
  {[-2]: {num: 10, char: 'C\uED64'}, [-1]: {num: 11, char: 'C\uED60'}, 0: {num:  0, char: 'C'}, 1: {num:  1, char: 'C\uED62'}, 2: {num:  2, char: 'C\uED63'}},
  {[-2]: {num:  0, char: 'D\uED64'}, [-1]: {num:  1, char: 'D\uED60'}, 0: {num:  2, char: 'D'}, 1: {num:  3, char: 'D\uED62'}, 2: {num:  4, char: 'D\uED63'}},
  {[-2]: {num:  2, char: 'E\uED64'}, [-1]: {num:  3, char: 'E\uED60'}, 0: {num:  4, char: 'E'}, 1: {num:  5, char: 'E\uED62'}, 2: {num:  6, char: 'E\uED63'}},
  {[-2]: {num:  3, char: 'F\uED64'}, [-1]: {num:  4, char: 'F\uED60'}, 0: {num:  5, char: 'F'}, 1: {num:  6, char: 'F\uED62'}, 2: {num:  7, char: 'F\uED63'}},
  {[-2]: {num:  5, char: 'G\uED64'}, [-1]: {num:  6, char: 'G\uED60'}, 0: {num:  7, char: 'G'}, 1: {num:  8, char: 'G\uED62'}, 2: {num:  9, char: 'G\uED63'}},
  {[-2]: {num:  7, char: 'A\uED64'}, [-1]: {num:  8, char: 'A\uED60'}, 0: {num:  9, char: 'A'}, 1: {num: 10, char: 'A\uED62'}, 2: {num: 11, char: 'A\uED63'}},
  {[-2]: {num:  9, char: 'B\uED64'}, [-1]: {num: 10, char: 'B\uED60'}, 0: {num: 11, char: 'B'}, 1: {num:  0, char: 'B\uED62'}, 2: {num:  1, char: 'B\uED63'}},
];

export const positions: Array<Array<[number, number]>> = [
  [[0, 0], [6, 1], [1,-2]], // C
  [[1,-1], [0, 1], [6, 2]], // C#
  [[1, 0], [2,-2], [0, 2]], // D
  [[2,-1], [1, 1], [3,-2]], // D#
  [[2, 0], [3,-1], [1, 2]], // E
  [[3, 0], [2, 1], [4,-2]], // F
  [[4,-1], [3, 1], [2, 2]], // F#
  [[4, 0], [5,-2], [3, 2]], // G
  [[5,-1], [4, 1]],         // G#
  [[5, 0], [6,-2], [4, 2]], // A
  [[6,-1], [5, 1], [0,-2]], // A#
  [[6, 0], [0,-1], [5, 2]], // B
];
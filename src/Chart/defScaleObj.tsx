// flat:          \uED60
// natural:       \uED61
// sharp:         \uED62
// double sharp:  \uED63
// double flat:   \uED64

// half-diminished 7: \uF4D7
// diminished 7:      \uF4D8
// augmented 7:       \uF4D9
// major 7:           \uF4DA

// object with scale recipes (ordered by brightness)
export const defScaleObj: {[modeSetName: string]: {[modeName: string]: number[]}} = { 
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
};
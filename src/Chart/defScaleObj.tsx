export const defScaleObj: {[modeSetName: string]: {[modeName: string]: number[]}} = { 
  "Diatonic": { // ordered by brightness
    "lydian":     [0,2,4,6,7,9,11], 
    "ionian":     [0,2,4,5,7,9,11], 
    "mixolydian": [0,2,4,5,7,9,10], 
    "dorian":     [0,2,3,5,7,9,10], 
    "aeolian":    [0,2,3,5,7,8,10], 
    "phrygian":   [0,1,3,5,7,8,10], 
    "locrian":    [0,1,3,5,6,8,10],
  },
  "Harm. Minor": { // aeolian with ♯7
    "lydian ♯2":     [0,3,4,6,7,9,11],
    "ionian ♯5":     [0,2,4,5,8,9,11],
    "altered 𝄫7":    [0,1,3,4,6,8,9],    // ♯1!
    "ukr. dorian":   [0,2,3,6,7,9,10],
    "harm. minor":   [0,2,3,5,7,8,11], 
    "phrygian dom.": [0,1,4,5,7,8,10],
    "locrian ♮6":    [0,1,3,5,6,9,10],
  },
  "Harm. Major": { // ionian with ♭6
    "lydian ♭3":      [0,2,3,6,7,9,11],
    "harm. major":    [0,2,4,5,7,8,11],
    "mixolydian ♭2":  [0,1,4,5,7,9,10],
    "dorian ♭5":      [0,2,3,5,6,9,10],
    "lydian aug. ♯2": [0,3,4,6,8,9,11],  // ♭1!
    "phrygian ♭4":    [0,1,3,4,7,8,10],
    "locrian 𝄫7":     [0,1,3,5,6,8,9],
  },
  "Jazz Minor": { // aeolian with ♯6 and ♯7
    "locrian ♮2":    [0,2,3,5,6,8,10],   // ♯1!
    "lydian aug.":   [0,2,4,6,8,9,11],
    "altered":       [0,1,3,4,6,8,10],   // ♯1!
    "mixolydian ♯4": [0,2,4,6,7,9,10],
    "jazz minor":    [0,2,3,5,7,9,11],
    "aeolian dom.":  [0,2,4,5,7,8,10],
    "phrygian ♮6":   [0,1,3,5,7,9,10],
  },
  "Other": {
    "whole-tone": [0,2,4,6,8,10],
    // "major blues": [0,2,3,4,7,9],
    // "minor blues": [0,3,5,6,7,10],
    // "pentatonic": [0,2,4,7,9],
    // "diminished": [0,2,3,5,6,8,9,11],
    // "chromatic": [0,1,2,3,4,5,6,7,8,9,10,11],
  }
};
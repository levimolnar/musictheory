// export const chordIntervals: {[key: number]: string} = {
//   33:  "dim",
//   34:  "min",
//   43:  "maj",
//   44:  "aug",
//   333: "dim7",     // o7
//   334: "hdim7",    // ø7
//   343: "min7",     // m7
//   344: "minmaj7",  // mM7
//   433: "dom7",     // 7
//   434: "maj7",     // M7
//   442: "aug7",     // +7
//   443: "augmaj7",  // +M7
//   444: "aug",
// }

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
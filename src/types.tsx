export type Chord = {
  id: string, 
  root: string, 
  type: {
    full: string, 
    short: string, 
    symbol: string,
  }, 
  num: string, 
  seventh: boolean
};

export type Progression = Chord[];

export type Line = {lineId: string, progression: Progression};

export type Payload = {chord: Chord, setFunc: any, index: number, origin: string, seventh: boolean };
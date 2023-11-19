// Partly written with chatGPT

interface ChordTreeNode {
  children: { [interval: number]: ChordTreeNode };
  chordType: string | null;
}

export default class ChordTree {
  root: ChordTreeNode;

  constructor() {
    this.root = { children: {}, chordType: null };
  }

  insertChord(intervals: number[], chordType: string) {
    let currentNode: ChordTreeNode = this.root;

    for (const interval of intervals) {
      if (!currentNode.children[interval]) {
        currentNode.children[interval] = { children: {}, chordType: null };
      }
      currentNode = currentNode.children[interval];
    }

    currentNode.chordType = chordType;
  }

  findChord(intervals: number[]): string | null {
    let currentNode: ChordTreeNode = this.root;

    for (const interval of intervals) {
      if (!currentNode.children[interval]) {
        return null;
      }
      currentNode = currentNode.children[interval];
    }

    return currentNode.chordType;
  }
}

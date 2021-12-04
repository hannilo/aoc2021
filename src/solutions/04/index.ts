import {Coord} from "../../math/coordinates";

export const example = "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1\n" +
  "\n" +
  "22 13 17 11  0\n" +
  " 8  2 23  4 24\n" +
  "21  9 14 16  7\n" +
  " 6 10  3 18  5\n" +
  " 1 12 20 15 19\n" +
  "\n" +
  " 3 15  0  2 22\n" +
  " 9 18 13 17  5\n" +
  "19  8  7 25 23\n" +
  "20 11 10 24  4\n" +
  "14 21 16 12  6\n" +
  "\n" +
  "14 21 17 24  4\n" +
  "10 16 15  9 19\n" +
  "18  8 23 26 20\n" +
  "22 11 13  6  5\n" +
  " 2  0 12  3  7";


export class Cell {
  readonly val: string;
  public marked: boolean;

  constructor(val: string) {
    this.val = val;
    this.marked = false;
  }

}


export class Board {

  readonly size: number;
  readonly rows: Cell[][] = [];
  private _hasWon = false;

  private locations: Map<string, Coord> = new Map<string, Coord>();


  constructor(input: string[]) {
    const lines = input.map(value => value.split(RegExp("\\s+")));
    this.size = lines[0].length;
    if (lines.length != this.size) {
      throw Error("size mismatch cols: " + this.size + ", rows: " + lines.length + " " + lines);
    }
    lines.forEach((nums, row) => {
      this.rows[row] = [];
      nums.forEach((num, col) => {
        this.rows[row][col] = new Cell(num);
        this.locations.set(num, {x: col, y: row} as Coord);
      });
    });
  }

  get hasWon(): boolean {
    return this._hasWon;
  }

  //returns true if mark results in a win
  mark(num: string): boolean {
    const loc = this.locations.get(num);
    if (!loc) return false;
    this.rows[loc.y][loc.x].marked = true;
    this._hasWon = this.getRow(loc.y).map(c => c.marked).reduce((p, c) => p && c) ||
      this.getCol(loc.x).map(c => c.marked).reduce((p, c) => p && c);
    return this._hasWon
  }


  getUnmarkedValues(): string[] {
    return this.rows
      .map(value => value.filter(c => !c.marked))
      .flatMap(value => value)
      .map(c => c.val);
  }

  getRow(idx: number): Cell[] {
    return this.rows[idx];
  }

  getCol(idx: number): Cell[] {
    return this.rows.map(row => row[idx]);
  }
}

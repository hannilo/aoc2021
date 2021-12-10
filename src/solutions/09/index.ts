import {Coord} from "../../math/coordinates";

export const example =
  "2199943210\n" +
  "3987894921\n" +
  "9856789892\n" +
  "8767896789\n" +
  "9899965678";


export class Board {

  rows: number[][] = [];
  private _width: number;

  constructor(input: string[]) {
    this._width = input[0].length;
    input.forEach((nums, row) => {
      this.rows[row] = [];
      if (nums.length != this.width) throw Error("mismatched row lengths at row " + row);
      [...nums].map(s => parseInt(s, 10)).forEach((num, col) => {
        this.rows[row][col] = num;
      });
    });
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this.rows.length;
  }

  getHeightAt(c: Coord) {
    if (c.y > this.height - 1 || c.x > this.width - 1) {
      throw Error("invalid coord");
    }
    return this.rows[c.y][c.x];
  }

  getNeighbors(row: number, col: number): Coord[] {
    const coords: Coord[] = [];
    if (row < this.height - 1) {
      coords.push({y: row + 1, x: col});
    }
    if (row > 0) {
      coords.push({y: row - 1, x: col});

    }
    if (col < this.width - 1) {
      coords.push({y: row, x: col + 1});

    }
    if (col > 0) {
      coords.push({y: row, x: col - 1});
    }
    return coords;
  }

  getNeighborValues(row: number, col: number): number[] {
    const neighborValues = [];
    if (row < this.height - 1) {
      neighborValues.push(this.rows[row + 1][col]);
    }
    if (row > 0) {
      neighborValues.push(this.rows[row - 1][col]);
    }
    if (col < this.width - 1) {
      neighborValues.push(this.rows[row][col + 1]);
    }
    if (col > 0) {
      neighborValues.push(this.rows[row][col - 1]);
    }
    return neighborValues;
  }
}


export function findLowPoints(board: Board): Coord[] {
  const coords: Coord[] = [];
  for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      const val = board.rows[y][x];
      const neighborVals = board.getNeighborValues(y, x);
      if (neighborVals.filter(v => v > val).length == neighborVals.length) {
        coords.push({x: x, y: y});
      }
    }
  }
  return coords;
}

export const example =
  "5483143223\n" +
  "2745854711\n" +
  "5264556173\n" +
  "6141336146\n" +
  "6357385478\n" +
  "4167524645\n" +
  "2176841721\n" +
  "6882881134\n" +
  "4846848554\n" +
  "5283751526";


import {Coord} from "../../math/coordinates";

export function coordToKey(c: Coord): string {
  return `${c.y}:${c.x}`;
}

export function keyToCoord(s: string): Coord {
  const yx = s.split(":");
  return {y: parseInt(yx[0], 10), x: parseInt(yx[1], 10)};
}

//should create generic class
export class Grid {

  rows: number[][] = [];
  private _step = 0;
  private readonly _width: number;

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

  get step(): number {
    return this._step;
  }

  get width(): number {
    return this._width;
  }

  //returns number of flashes
  stepForward(): number {
    this._step++;
    const toFlash: string[] = [];
    const flashed: Set<string> = new Set<string>();

    this.rows.forEach((row, ri) => {
      row.forEach((_, ni) => {
        this.rows[ri][ni] += 1;
        if (this.rows[ri][ni] > 9) {
          toFlash.push(coordToKey({y: ri, x: ni}));
        }
      });
    });

    while (toFlash.length > 0) {
      const c = keyToCoord(<string>toFlash.shift());
      flashed.add(coordToKey(c));
      this.getNeighbors(c.y, c.x).forEach(nc => {
        const ncKey = coordToKey(nc)
        if (!flashed.has(coordToKey(nc)) && !toFlash.includes(ncKey)) {
          this.rows[nc.y][nc.x] += 1;
          if (this.rows[nc.y][nc.x] > 9) {
            toFlash.push(ncKey);
          }
        }
      });
    }

    flashed.forEach(s => {
      const c = keyToCoord(s);
      this.rows[c.y][c.x] = 0;
    });

    return flashed.size;
  }

  getNeighbors(row: number, col: number): Coord[] {
    const coords: Coord[] = [];
    for (let y = Math.max(0, row - 1); y <= Math.min(this.rows.length - 1, row + 1); y++) {
      for (let x = Math.max(0, col - 1); x <= Math.min(this.width - 1, col + 1); x++) {
        if (x != col || y != row) {
          coords.push({"x": x, "y": y});
        }
      }
    }
    return coords;
  }

  toString(): string {
    return this.rows.map(row => row.join("")).join("\n");
  }
}

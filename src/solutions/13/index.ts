import {Coord} from "../../math/coordinates";

export const example =
  "6,10\n" +
  "0,14\n" +
  "9,10\n" +
  "0,3\n" +
  "10,4\n" +
  "4,11\n" +
  "6,0\n" +
  "6,12\n" +
  "4,1\n" +
  "0,13\n" +
  "10,12\n" +
  "3,4\n" +
  "3,0\n" +
  "8,4\n" +
  "1,10\n" +
  "2,14\n" +
  "8,10\n" +
  "9,0\n" +
  "\n" +
  "fold along y=7\n" +
  "fold along x=5";

const EMPTY = ".";
const FULL = "#";

type Fold = {
  axis: string,
  val: number
}

export class Paper {

  private readonly rows: string[][];
  foldQueue: Fold[] = [];

  constructor(input: [string[], string[]]) {
    const coords = input[0];
    let maxX = 0;
    let maxY = 0;
    const xyArr = <Coord[]>coords.map(c => {
      const xy = <[number, number]>c.split(",").map(n => parseInt(n, 10));
      maxX = xy[0] > maxX ? xy[0] : maxX;
      maxY = xy[1] > maxY ? xy[1] : maxY;
      return {x: xy[0], y: xy[1]};
    });
    this.rows = [...Array(maxY + 1).keys()].map(() => [...Array(maxX + 1).fill(EMPTY)]);
    xyArr.forEach(c => {
      this.rows[c.y][c.x] = FULL;
    });

    this.foldQueue = input[1].map(s => {
      const m = <RegExpMatchArray>s.match(RegExp("([xy])=(\\d+)"));
      return {axis: m[1], val: parseInt(m[2], 10)};
    });
  }

  foldY(y: number) {
    if (this.countRow(y) != 0) {
      throw Error(`illegal fold: row ${y} is not empty`);
    }
    //should check if y is in legal range
    for (let i = 0; i < y; i++) {
      const last = <string>this.rows.pop()?.join("");
      this.rows[i] = [...Paper.combine(this.rows[i].join(""), last)];
    }
    this.rows.pop();
  }

  foldX(x: number) {
    if (this.countCol(x) != 0) {
      throw Error(`illegal fold: col ${x} is not empty`);
    }
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i] = [...Paper.combine(this.rows[i].slice(0, x).join(""), this.rows[i].slice(x + 1).reverse().join(""))];
    }
  }

  run() {
    while (this.foldQueue.length > 0) {
      const curr = <Fold>this.foldQueue.shift();
      switch (curr.axis) {
        case "y":
          this.foldY(curr.val);
          break;
        case "x":
          this.foldX(curr.val);
          break
        default:
          throw Error("invalid fold");
      }
    }
  }

  countRow(y: number): number {
    return this.rows[y].reduce((p, c) => c == FULL ? p + 1 : p, 0);
  }

  countCol(x: number): number {
    return this.rows.map(a => a[x]).reduce((p, c) => c == FULL ? p + 1 : p, 0);
  }

  countDots(): number {
    return this.rows.map(value => value.filter(s => s == FULL).length).reduce((p, c) => p + c);
  }

  readonly toString = (): string => {
    return this.rows.map(r => r.join("")).join("\n");
  };

  static combine(s1: string, s2: string): string {
    if (s1.length != s2.length) {
      throw Error(`lenght mismatch: ${s1} + ${s2}`);
    }
    const a1 = [...s1];
    const a2 = [...s2];
    return a1.map((_, i) => a1[i] == FULL || a2[i] == FULL ? FULL : EMPTY).join("");
  }
}
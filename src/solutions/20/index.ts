export const example_grid =
  "#..#.\n" +
  "#....\n" +
  "##..#\n" +
  "..#..\n" +
  "..###";

export const example_rule =
  "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##" +
  "#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###" +
  ".######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#." +
  ".#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#....." +
  ".#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.." +
  "...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#....." +
  "..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#";

const ON = "#";
const OFF = ".";

export class InfiniteImage {
  map: string[];
  height: number;
  width: number;
  oobValue = OFF;
  rules: string;

  constructor(input: string[], rules: string) {
    this.map = input.map(s => this.oobValue + s + this.oobValue);
    this.width = this.map[0].length;
    this.map.splice(0, 0, this.oobValue.repeat(this.width));
    this.map.push(this.oobValue.repeat(this.width));
    this.height = this.map.length;
    this.rules = rules;
  }

  toString(): string {
    return this.map.join("\n");
  }

  valueAt(row: number, col: number): string {
    if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
      return this.oobValue;
    } else {
      return this.map[row][col];
    }
  }

  newOobValue(): string {
    if (this.rules[0] == ON) {
      return this.oobValue == ON ? OFF : ON;
    } else {
      return OFF;
    }
  }

  getAdjacencyString(row: number, col: number): string {
    const res: string[] = [];
    [row - 1, row, row + 1].forEach(r => {
      [col - 1, col, col + 1].forEach(c => {
        res.push(this.valueAt(r, c));
      });
    });
    return res.join("");
  }

  enhance() {
    const enhanced: string[][] = Array(this.height);
    this.map.forEach((s, row) => {
      enhanced[row] = [];
      [...s].forEach((_, col) => {
        const adj = this.getAdjacencyString(row, col);
        enhanced[row][col] = this.rules[parseInt([...adj].map(c => c == ON ? "1" : "0").join(""), 2)];
      });
    });
    this.oobValue = this.newOobValue();

    this.map = enhanced.map(arr => this.oobValue + arr.join("") + this.oobValue);
    this.map.splice(0, 0, this.oobValue.repeat(this.width + 2));
    this.map.push(this.oobValue.repeat(this.width + 2));
    this.width = this.map[0].length;
    this.height = this.map.length;
  }

  countLit(): number {
    return this.map.map(s => [...s].reduce((acc, curr) => curr == ON ? acc + 1 : acc, 0)
    ).reduce((p, c) => p + c);
  }
}
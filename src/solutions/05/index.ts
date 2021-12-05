import {Coord} from "../../math/coordinates";

export const example =
  "0,9 -> 5,9\n" +
  "8,0 -> 0,8\n" +
  "9,4 -> 3,4\n" +
  "2,2 -> 2,1\n" +
  "7,0 -> 7,4\n" +
  "6,4 -> 2,0\n" +
  "0,9 -> 2,9\n" +
  "3,4 -> 1,4\n" +
  "0,0 -> 8,8\n" +
  "5,5 -> 8,2";


const LINE_REGEXP = RegExp("(\\d+),(\\d+) -> (\\d+),(\\d+)");

export function parseInputLine(line: string): [Coord, Coord] {
  const r = line.match(LINE_REGEXP)?.slice(1, 5).map(s => parseInt(s, 10));
  if (!r) {
    throw Error("invalid line " + line);
  }
  return [{x: r[0], y: r[1]}, {x: r[2], y: r[3]}];
}
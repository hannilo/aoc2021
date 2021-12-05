import {parseInputLine} from "./index";
import {max} from "../../math";

export const solve = (input: string[], diagonals: boolean): number => {
  const lines = input.map(parseInputLine);
  const maxY = Math.max(...lines.map(value => max(value[0].y, value[1].y)));
  const map: number[][] = [...Array(maxY + 1).keys()].map(() => []);

  lines.forEach(line => {
    if (line[0].x == line[1].x) {     //horizontal
      let y0, y1;
      if (line[0].y >= line[1].y) {
        y0 = line[1].y;
        y1 = line[0].y;
      } else {
        y0 = line[0].y;
        y1 = line[1].y;
      }
      [...Array(y1 + 1).keys()].slice(y0).forEach(y => {
        map[y][line[0].x] ? map[y][line[0].x] += 1 : map[y][line[0].x] = 1;
      });
    } else if (line[0].y == line[1].y) { //vertical
      let x0, x1;
      if (line[0].x >= line[1].x) {
        x0 = line[1].x;
        x1 = line[0].x;
      } else {
        x0 = line[0].x;
        x1 = line[1].x;
      }
      [...Array(x1 + 1).keys()].slice(x0).forEach(x => {
        map[line[0].y][x] ? map[line[0].y][x] += 1 : map[line[0].y][x] = 1;
      });
    } else if (diagonals) { // diagonal (the lines in your list will only ever be horizontal, vertical, or a diagonal)
      const sorted = line.sort((a, b) => a.x > b.x ? 1 : -1);
      const yStep = sorted[0].y > sorted[1].y ? -1 : 1;
      let y = sorted[0].y;
      for (let x = sorted[0].x; x <= sorted[1].x; x++) {
        map[y][x] ? map[y][x] += 1 : map[y][x] = 1;
        y += yStep;
      }
    }
  });

  let count = 0;
  map.forEach(row => {
    for (let i = 0; i < row.length; i++) {
      if (!(i in row)) {
        row[i] = 0;
      }
      if (row[i] > 1) count++;
    }
    //console.log(row.map(value => value ? value : ".").join(' '));
  });

  return count;
};
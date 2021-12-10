import {validate} from "./part_one";
import {closer, matches, opener} from "./index";

const score = new Map([
  [")", 1],
  ["]", 2],
  ["}", 3],
  [">", 4],
]);

export function complete(line: string): string {
  const fifo: string[] = [];
  const chars = [...line];
  let addition = "";
  for (let i = line.length - 1; i >= 0; i--) {
    const c = chars[i];
    if (closer.includes(c)) {
      fifo.push(c);
    } else if (opener.includes(c)) {
      if (c == matches.get(fifo[fifo.length - 1])) {
        fifo.pop();
      } else {
        addition = addition + matches.get(c);
      }
    }
  }
  return addition;
}


export function solve(input: string[]): number {
  const res = input.filter(s => validate(s).valid).map(s => complete(s)).map(s => {
    const chars = [...s];
    return chars.map(c => <number>score.get(c)).reduce((p, c) => 5 * p + c, 0);
  }).sort((a, b) => a > b ? 1 : -1);
  return res[Math.floor(res.length/2)];
}
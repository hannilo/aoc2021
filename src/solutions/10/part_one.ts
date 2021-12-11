import {closer, matches, opener, ValidationResult} from "./index";


const score = new Map([
  [")", 3],
  ["]", 57],
  ["}", 1197],
  [">", 25137],
]);


export function validate(line: string): ValidationResult {
  const lifo: string[] = [];
  const chars = [...line];
  for (let i = 0; i < line.length; i++) {
    const c = chars[i];
    if (opener.includes(c)) {
      lifo.push(c);
    } else if (closer.includes(c)) {
      if (c != matches.get(lifo[lifo.length - 1])) {
        console.log("err at", i, "expected", matches.get(lifo[lifo.length - 1]), "got", c, "instead");
        return {valid: false, errIdx: i};
      } else {
        lifo.pop();
      }
    }
  }
  return {valid: true, errIdx: -1};
}

export function solve(input: string[]): number {
  const validated = <string[]><unknown>input.map(s => {
    const r = validate(s);
    return r.valid ? undefined : [...s][r.errIdx];
  }).filter(s => s != undefined);
  console.log(validated);
  return validated.map(c => <number>score.get(c)).reduce((p, c) => p + c);
}

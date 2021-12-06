export const example = "3,4,3,1,2";


export function parseInputLine(line: string): number[] {
  return line.split(",").map(value => parseInt(value, 10));
}

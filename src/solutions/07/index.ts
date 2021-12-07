export const example = "16,1,2,0,4,2,7,1,2,14";


export function parseInputLine(line: string): number[] {
  return line.split(",").map(value => parseInt(value, 10));
}

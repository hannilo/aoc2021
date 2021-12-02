import {LINE_REGEXP} from "./index";

type Axis2D = "x" | "y"

type Position = {
  [key in Axis2D]: number;
};

function parseLine(line: string): { axis: Axis2D, delta: number } {
  const match = line.match(LINE_REGEXP);
  if (!match) {
    throw Error("invalid line " + line);
  }
  return {
    axis: match[1] == "forward" ? "x" : "y",
    delta: match[1] == "up" ? -parseInt(match[2]) : parseInt(match[2])
  };
}

export const solve = (input: string[]): number => {
  const pos = {x: 0, y: 0} as Position;
  input.map(l => parseLine(l)).forEach(m => {
    pos[m.axis] += m.delta;
  });
  console.log(pos);
  return pos["x"] * pos["y"];
};
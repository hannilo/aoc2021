import {LINE_REGEXP} from "./index";

type Position3D = {
  [key in "x" | "y" | "z"]: number;
};

enum Direction {
  UP = "up",
  DOWN = "down",
  FORWARD = "forward",
}

function parseLine(line: string): { direction: Direction, delta: number } {
  const match = line.match(LINE_REGEXP);
  if (!match) {
    throw Error("invalid line " + line);
  }
  return {
    direction: match[1] as Direction, //unsafe
    delta: parseInt(match[2]),
  };
}

export const solve = (input: string[]): number => {
  const pos = {x: 0, y: 0, z: 0} as Position3D;
  input.map(v => parseLine(v)).forEach(v => {
    switch (v.direction) {
      case Direction.DOWN:
        pos.z += v.delta;
        break
      case Direction.UP:
        pos.z -= v.delta;
        break
      case Direction.FORWARD:
        pos.x += v.delta;
        pos.y += pos.z * v.delta;
        break
      default:
        throw Error("invalid direction");
    }
  });
  return pos.x * pos.y;
};
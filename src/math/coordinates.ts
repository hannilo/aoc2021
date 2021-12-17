export type Coord = {
  [key in "x" | "y"]: number;
}

export type Coord3D = {
  [key in "x" | "y" | "z"]: number;
};

//y:x
export function coordToKey(c: Coord): string {
  return `${c.y}:${c.x}`;
}

//y:x
export function keyToCoord(s: string): Coord {
  const yx = s.split(":");
  return {y: parseInt(yx[0], 10), x: parseInt(yx[1], 10)};
}
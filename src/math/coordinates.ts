export type Coord = {
  [key in "x" | "y"]: number;
}

export type Coord3D = {
  [key in "x" | "y" | "z"]: number;
};
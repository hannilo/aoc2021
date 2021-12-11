import {Grid} from "./index";

export function solve(input: string[]): number {
  const grid = new Grid(input);
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    flashes += grid.stepForward();
  }
  return flashes;
}

export function solvePt2(input: string[]): number {
  const grid = new Grid(input);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const flashed = grid.stepForward()
    if (flashed == grid.rows.length * grid.width) {
      return grid.step
    }
  }
}

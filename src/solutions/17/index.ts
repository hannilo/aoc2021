import {Coord, coordToKey} from "../../math/coordinates";

export const example = "target area: x=20..30, y=-10..-5";

export function parseTargetArea(input: string): [Coord, Coord] {
  const m = input.match(RegExp("target area: x=(\\d+)..(\\d+), y=(-?\\d+)..(-?\\d+)"));
  if (!m) {
    throw Error("invalid string " + input);
  }
  return [
    {x: parseInt(m[1], 10), y: parseInt(m[3], 10)},
    {x: parseInt(m[2], 10), y: parseInt(m[4], 10)},
  ];
}

export function findMaxVY0(target: [Coord, Coord]): number {
  //every positive-Y trajectory crosses y=0 on some step with vY == vY_0
  //ergo, the fastest vY_0 is one that exactly ends up at the min.y coord after crossing y=0
  //if the target area were above us, vY_0 would simply be max.y
  return Math.abs(target[0].y) - 1;
}

export function calcPossibleStepsToTarget(target: [Coord, Coord], vY0: number): number[] {
  const min = target[0];
  const max = target[1];
  const stepsToLevel = vY0 >= 0 ? 2 * vY0 + 1 : 0;
  const v = vY0 >= 0 ? -(vY0 + 1) : vY0;
  let stepsToDrop = 0;
  const possibleSteps = [];
  let y = 0;
  while (y > max.y) {
    y -= (stepsToDrop++ + Math.abs(v));
  }
  if (y < min.y) {
    return [];
  }
  possibleSteps.push(stepsToLevel + stepsToDrop);
  while (y >= min.y) {
    y -= (stepsToDrop++ + Math.abs(v));
    if (y >= min.y) {
      possibleSteps.push(stepsToLevel + stepsToDrop);
    }
  }
  return possibleSteps;
}

export function findXCoord(vx: number, steps: number): number {
  let sum = 0;
  let v = vx;
  for (let s = 1; s <= steps; s++) {
    sum += v;
    v = v - 1 > 0 ? v - 1 : 0;
  }
  return sum;
}

export function findPossibleVY0s(target: [Coord, Coord]): Set<string> {
  const min = target[0];
  const max = target[1];
  const maxVY = findMaxVY0(target);
  const possibleVs: Set<string> = new Set<string>();
  for (let vy = min.y; vy <= maxVY; vy++) {
    const steps = calcPossibleStepsToTarget(target, vy);
    const vyEntries: Set<string> = new Set<string>();
    steps.forEach(stepCount => {
      const maxVx = max.x;
      const minVx = 1;
      for (let vx = minVx; vx <= maxVx; vx++) {
        const x = findXCoord(vx, stepCount);
        if (x >= min.x && x <= max.x) {
          vyEntries.add(coordToKey({x: vx, y: vy}));
        }
      }
    });
    vyEntries.forEach(e => possibleVs.add(e));
  }
  return possibleVs;
}
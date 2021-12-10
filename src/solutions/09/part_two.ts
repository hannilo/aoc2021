import {Board, findLowPoints} from "./index";
import {Coord} from "../../math/coordinates";

function coordToKey(c: Coord): string {
  return `${c.y}:${c.x}`;
}

function keyToCoord(s: string): Coord {
  const yx = s.split(":")
  return {y: parseInt(yx[0], 10), x: parseInt(yx[1], 10)}
}

export const solve = (input: string[]): number => {
  const board = new Board(input);
  const lowPoints: Coord[] = findLowPoints(board);
  const basins: Coord[][] = [];
  lowPoints.forEach(c => {
    const toCheck: Coord[] = board.getNeighbors(c.y, c.x);
    const basin: Set<string> = new Set<string>([coordToKey(c)]);
    // queue > recursion
    while (toCheck.length > 0) {
      const next = toCheck.pop();
      if (!next) {
        throw Error("undefined in queue");
      }
      if (board.getHeightAt(next) != 9) { //could move this up/down
        basin.add(coordToKey(next));
        toCheck.push(...board.getNeighbors(next.y, next.x).filter(n => !basin.has(coordToKey(n))));
      }
    }
    basins.push([...basin.keys()].map(keyToCoord));
  });
  return basins.sort((a, b) => a.length >= b.length ? -1 : 1)
    .slice(0, 3) //no check
    .reduce((p, c) => p * c.length, 1);
};

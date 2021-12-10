import {Board, findLowPoints} from "./index";

export const solve = (input: string[]): number => {
  const board = new Board(input);
  const lowPointValues: number[] = findLowPoints(board).map(c => board.rows[c.y][c.x]);
  return lowPointValues.reduce((p, c) => p + c) + lowPointValues.length;
};

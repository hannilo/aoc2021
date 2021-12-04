import {Board} from "./index";


export function findFirstWinner(boards: Board[], queue: string[]): [Board, string] {
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) {
      throw Error("exhausted queue");
    }
    const winners = boards.filter(value => value.mark(curr));
    console.log(boards.length, curr);
    if (winners.length > 0) {
      if (winners.length != 1) {
        throw Error("multiple winners");
      }
      return [winners[0], curr];
    }
  }
  throw Error("no winners");
}

export function findLastWinner(boards: Board[], queue: string[]): [Board, string] {
  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) {
      throw Error("exhausted queue");
    }
    if (boards.length > 1) {
      boards = boards.filter(value => !value.mark(curr));
    } else {
      boards.forEach(value => value.mark(curr));
    }
    console.log(boards.length, curr);
    if (boards.length == 1 && boards[0].hasWon) {
      return [boards[0], curr];
    }
  }
  throw Error("exhausted queue");
}

export const solve = (input: string, choiceFn: ((boards: Board[], queue: string[]) => [Board, string])): number => {
  const chunks = input.split(RegExp("(?:\\r?\\n){2}"));
  const queue = chunks.shift()?.split(',');
  if (!queue) {
    throw Error("no queue");
  }
  const boards = chunks.map(value =>
    new Board(value.splitLines())
  );
  const chosen = choiceFn(boards, queue);
  const unmarked = chosen[0].getUnmarkedValues();
  const sum = unmarked.map(s => parseInt(s)).reduce((p, c) => p + c);
  return sum * parseInt(chosen[1]);
};
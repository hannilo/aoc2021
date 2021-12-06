import {parseInputLine} from "./index";

export const solve = (input: string, days: number): number => {
  const arr = [...Array(9).keys()].map(() => 0);
  parseInputLine(input).forEach(value => {
    arr[value] += 1;
  });

  for (let i = 1; i <= days; i++) {
    const newFish = arr[0];
    for (let f = 0; f < 8; f++) {
      arr[f] = arr[f + 1];
    }
    arr[8] = newFish;
    arr[6] += newFish;
  }

  return arr.reduce((previousValue, currentValue) => previousValue + currentValue);
};

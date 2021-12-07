import {parseInputLine} from "./index";


export function calcAlignmentFuelLinear(arr: number[], target: number): number {
  return arr.map(value => Math.abs(value - target)).reduce((p, c) => p + c);
}

export function calcAlingmentFuelExponential(arr: number[], target: number): number {
  const ret = arr.map(value => {
    const diff = Math.abs(value - target);
    if (diff == 0 || diff == 1) return diff;
    //return diff % 2 == 0 ? Math.ceil((diff + 1) * diff / 2) : Math.ceil((diff + 1) * (diff - 1) / 2 + (diff / 2)); //Gauss sum!
    return (diff ** 2 + diff) / 2;
  });
  return ret.reduce((p, c) => p + c);
}

//naiive implementation!
//- part I could stop as soon as prev < curr
//- part II could scan +-1 from mean
//@return [location, fuel]
export function findMinimumAlignment(arr: number[], startFrom: number, fuelCalculator: ((a: number[], t: number) => number)): [number, number] {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const distances = [...Array(max).keys()].map(() => 0);
  distances[startFrom] = fuelCalculator(arr, startFrom);
  for (let i = 1; i < Math.max(Math.abs(startFrom - min), Math.abs(startFrom - max)); i++) {
    [startFrom + i, startFrom - i].forEach(t => {
      if (t >= 0 && t <= max) {
        distances[t] = fuelCalculator(arr, t);
      }
    });
  }
  console.log(distances);
  return distances.reduce((acc, c, idx) => c < acc[1] ? [idx, c] : acc, [-1, Infinity]);
}

export const solve = (input: string, fuelCalculator: ((a: number[], t: number) => number)): number => {
  const arr = parseInputLine(input).sort((a, b) => a > b ? 1 : -1);
  console.log("arr", arr);
  const sum = arr.reduce((p, c) => p + c);
  const avg = sum / arr.length;
  console.log("mean", avg.toFixed(0));
  const alignment = findMinimumAlignment(arr, parseInt(avg.toFixed(0)), fuelCalculator);
  console.log("alignment", alignment);
  return alignment[1];
};

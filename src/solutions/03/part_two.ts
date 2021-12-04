import {mostCommonBits} from "./index";

export function checkBit(num: number, mask: number, expected: number): boolean {
  if (expected != 0 && expected != 1) {
    throw Error("unexpected expecations " + expected);
  }
  if ((mask & num) == 0) {
    return expected == 0;
  } else {
    return expected == 1;
  }
}

function getRating(input: string[], common: boolean) {
  const width = input[0].length;
  let remaining = input;
  for (let i = 0; i < width; i++) {
    const mostCommon = mostCommonBits(remaining);
    const mask = 2 ** (width - i - 1);
    let checkValue: number;
    if (common) {
      checkValue = (mostCommon[i] != 0) ? 1 : 0;
    } else {
      if (mostCommon[i] == -1) {
        checkValue = 0
      } else {
        checkValue = (mostCommon[i] == 1) ? 0 : 1;
      }
    }
    remaining = remaining.filter(value => checkBit(parseInt(value, 2), mask, checkValue));
    if (remaining.length == 1) {
      console.log(remaining);
      return parseInt(remaining[0], 2);
    }
  }
  throw Error("could not find rating");
}

function O2GeneratorRating(input: string[]): number {
  return getRating(input, true)
}

function CO2ScrubberRating(input: string[]): number {
  return getRating(input, false)
}

export const solve = (input: string[]): number => {
  const o2 = O2GeneratorRating(input);
  const co2 = CO2ScrubberRating(input);
  console.log(o2, co2);
  return o2 * co2;
};
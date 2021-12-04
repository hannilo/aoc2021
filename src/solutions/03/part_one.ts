import {mostCommonBits} from "./index";

export const solve = (input: string[]): number => {
  const mostCommon = mostCommonBits(input);
  const gamma = parseInt(mostCommon.join(''), 2);
  const epsilon = parseInt(mostCommon.map(n => n > 0 ? 0 : 1).join(''), 2); // or ((n)^((1u<<(b))-1))
  console.log(mostCommon, gamma.toString(2), epsilon.toString(2));
  console.log(gamma, epsilon);
  return gamma * epsilon;
};
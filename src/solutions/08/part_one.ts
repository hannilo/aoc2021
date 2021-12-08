import {parseLine} from "./index";

const SEGMENT_COUNTS = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];




//count unique segments
export const solve = (lines: string[]): number => {
  const parsed = lines.map(parseLine).map(value => value[1]);
  console.log(parsed);
  const uniqueCounts = [SEGMENT_COUNTS[1], SEGMENT_COUNTS[4], SEGMENT_COUNTS[7], SEGMENT_COUNTS[8]];
  const c = parsed.map(value => value.filter(value1 => uniqueCounts.includes(value1.length))).reduce((acc, c) => acc + c.length, 0);
  console.log(uniqueCounts, c);
  return c;
};
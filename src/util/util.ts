import * as fs from 'fs';
import path from "path";
import "../extensions/string.extensions";


export const readInput = (file: string): string => {
  return fs.readFileSync(path.join("./input/", file), "utf-8").trim();
};

export const readInputLines = (file: string): string[] => {
  return readInput(file).splitLines();
};

export const splitChunks = (input: string): string[][] => {
  const chunks = input.split(RegExp("(?:\\r?\\n){2}"));
  return chunks.map(s => s.splitLines());
};

export const getFrequencies = <T>(arr: T[]) => {
  const m = new Map<T, number>();
  arr.forEach(value => {
    if (m.has(value)) {
      m.set(value, <number>m.get(value) + 1);
    } else {
      m.set(value, 1);
    }
  });
  return m;
};

export function frequencyMinimum<T>(m: Map<T, number>): [T, number][] {
  let min = Infinity;
  let results: [T, number][] = [];
  m.forEach((value, key) => {
    if (value < min) {
      min = value;
      results = [[key, value]];
    } else if (value == min) {
      results.push([key, value]);
    }
  });
  return results;
}

export function frequencyMaximum<T>(m: Map<T, number>): [T, number][] {
  let max = 0;
  let results: [T, number][] = [];
  m.forEach((value, key) => {
    if (value > max) {
      max = value;
      results = [[key, value]];
    } else if (value == max) {
      results.push([key, value]);
    }
  });
  return results;
}
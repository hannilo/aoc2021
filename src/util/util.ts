import * as fs from 'fs';
import path from "path";
import "../extensions/string.extensions";


export const readInput = (file: string): string => {
  return fs.readFileSync(path.join("./input/", file), "utf-8").trim();
};

export const readInputLines = (file: string): string[] => {
  return readInput(file).splitLines();
};

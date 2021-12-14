import "../../extensions/string.extensions";
import {readInput, splitChunks} from "../../util/util";
import {example, Paper} from "./index";
import {expect} from "chai";

describe(`13 - Part I parse`, () => {
  it(`should create grid from input`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const g = new Paper(chunks);
    const expected =
      "...#..#..#.\n" +
      "....#......\n" +
      "...........\n" +
      "#..........\n" +
      "...#....#.#\n" +
      "...........\n" +
      "...........\n" +
      "...........\n" +
      "...........\n" +
      "...........\n" +
      ".#....#.##.\n" +
      "....#......\n" +
      "......#...#\n" +
      "#..........\n" +
      "#.#........";
    expect(g.toString()).to.equal(expected);
    expect(g.foldQueue.length).to.equal(2);
  });
});

describe(`13 - Part I comibne`, () => {
  it(`should OR strings together`, async () => {
    const s1 = "#..#.#...";
    const s2 = "....#...#";
    const expected = "#..###..#";
    expect(Paper.combine(s1, s2)).to.equal(expected);
  });
});

describe(`13 - Part I fold`, () => {
  it(`should fold grid`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const g = new Paper(chunks);
    g.foldY(7);
    let expected =
      "#.##..#..#.\n" +
      "#...#......\n" +
      "......#...#\n" +
      "#...#......\n" +
      ".#.#..#.###\n" +
      "...........\n" +
      "...........";
    expect(g.toString()).to.equal(expected);
    expect(g.countDots()).to.equal(17);
    expect(g.countCol(0)).to.equal(3);
    g.foldX(5);
    expected =
      "#####\n" +
      "#...#\n" +
      "#...#\n" +
      "#...#\n" +
      "#####\n" +
      ".....\n" +
      ".....";
    expect(g.toString()).to.equal(expected);
  });
});

describe(`13 - Part I example`, () => {
  it(`should solve example`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const g = new Paper(chunks);
    const expected =
      "#####\n" +
      "#...#\n" +
      "#...#\n" +
      "#...#\n" +
      "#####\n" +
      ".....\n" +
      ".....";
    g.run();
    expect(g.toString()).to.equal(expected);
  });
});

describe(`13 - Part I solution`, () => {
  it(`should solve input`, async () => {
    const chunks = <[string[], string[]]>splitChunks(readInput("13.txt"));
    const g = new Paper(chunks);
    g.foldX(655);
    expect(g.countDots()).to.equal(712);
  });
});

describe(`13 - Part II solution`, () => {
  it(`should solve input`, async () => {
    const chunks = <[string[], string[]]>splitChunks(readInput("13.txt"));
    const g = new Paper(chunks);
    g.run();
    console.log(g.toString());
    //BLHFJPJF
    expect(g.countDots()).to.equal(90);
  });
});
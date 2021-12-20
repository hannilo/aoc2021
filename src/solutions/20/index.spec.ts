import {describe} from "mocha";
import {expect} from "chai";
import {example_grid, example_rule, InfiniteImage} from "./index";
import "../../extensions/string.extensions";
import {readInput, splitChunks} from "../../util/util";

describe("20 - part I", () => {
  it("creates pixel map", async () => {
    const img = new InfiniteImage(example_grid.splitLines(), example_rule);
    expect(img.map.length).to.equal(7);
    expect(img.getAdjacencyString(0, 0)).to.equal("........#");
    expect(img.getAdjacencyString(1, 1)).to.equal("....#..#.");
  });
  it("enhances pixel map", async () => {
    const img = new InfiniteImage(example_grid.splitLines(), example_rule);
    console.log(img.toString());
    expect(img.map.length).to.equal(7);
    img.enhance();
    img.enhance();
    const expected =
      "...........\n" +
      "........#..\n" +
      "..#..#.#...\n" +
      ".#.#...###.\n" +
      ".#...##.#..\n" +
      ".#.....#.#.\n" +
      "..#.#####..\n" +
      "...#.#####.\n" +
      "....##.##..\n" +
      ".....###...\n" +
      "..........."
    expect(img.toString()).to.equal(expected)
    expect(img.countLit()).to.equal(35)
  });
});

describe("20 - part I solution", () => {
  it("solves input", async () => {
    const chunks = splitChunks(readInput("20.txt"))
    const img = new InfiniteImage(chunks[1], chunks[0][0]);
    console.log(img.toString())
    img.enhance();
    console.log(img.toString())
    img.enhance();
    console.log(img.toString())
    expect(img.countLit()).to.equal(5498)
  });
});

describe("20 - part II solution", () => {
  it("solves input", async () => {
    const chunks = splitChunks(readInput("20.txt"))
    const img = new InfiniteImage(chunks[1], chunks[0][0]);
    for (let i = 0; i < 50; i++) {
      img.enhance();
    }
    expect(img.countLit()).to.equal(16014)
  });
});
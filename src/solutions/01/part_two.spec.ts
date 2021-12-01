import {expect} from "chai";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";
import {example} from "./index";
import {solve} from "./part_two";

describe(`01 - Part 2 example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(5);
  });
});

describe(`01 - Part 2 solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("01.txt"))).to.equal(1724);
  });
});
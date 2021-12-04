import {expect} from "chai";
import {checkBit, solve} from "./part_two";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";
import {example, mostCommonBits} from "./index";


describe(`03 - common bits fallback`, () => {
  it(`fallback in case of equal number of bits at position`, async () => {
    const ex = [
      "1100",
      "1000",
      "1001",
      "1101",
    ]
    expect(mostCommonBits(ex)).to.eql([1, -1, 0, -1]);
  });
});


describe(`03 - check bit`, () => {
  it(`checks if bit matches`, async () => {
    const mask = 2 ** 3
    const bString = "1100"
    expect(checkBit(parseInt(bString, 2), mask, 1)).to.equal(true);
    expect(checkBit(parseInt(bString, 2), mask, 0)).to.equal(false);
  });
});

describe(`03 - Part II example`, () => {
  it(`solves example`, async () => {
    expect(solve(example.splitLines())).to.equal(230);
  });
});

describe(`03 - Part II solution`, () => {
  it(`finds solution`, async () => {
    expect(solve(readInputLines("03.txt"))).to.equal(4267809);
  });
});
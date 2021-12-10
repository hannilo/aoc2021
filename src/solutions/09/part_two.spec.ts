import {expect} from "chai";
import {example} from "./index";
import {solve} from "./part_two";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";


describe(`09 - Part II example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(1134);
  });
});

describe(`09 - Part II example`, () => {
  it(`should solve input`, async () => {
    expect(solve(readInputLines("09.txt"))).to.equal(931200);
  });
});

import {expect} from "chai";
import {solve} from "./part_one";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";
import {example} from "./index";

describe(`03 - Part I example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(198);
  });
});

describe(`03 - Part I solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("03.txt"))).to.equal(3969000);
  });
});
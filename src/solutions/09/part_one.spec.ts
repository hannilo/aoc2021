import {expect} from "chai";
import {example} from "./index";
import "../../extensions/string.extensions";
import {solve} from "./part_one";
import {readInputLines} from "../../util/util";

describe(`09 - Part I example`, () => {
  it(`should low points`, async () => {
    expect(solve(example.splitLines())).to.equal(15);
  });
});

describe(`09 - Part I solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("09.txt"))).to.equal(506);
  });
});
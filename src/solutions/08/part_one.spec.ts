import {expect} from "chai";
import {example} from "./index";
import {solve} from "./part_one";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";

describe(`08 - Part I example`, () => {
  it(`should find unique numbers`, async () => {
    expect(solve(example.splitLines())).to.equal(26);
  });
});

describe(`08 - Part I solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("08.txt"))).to.equal(318);
  });
});

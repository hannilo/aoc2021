import {expect} from "chai";
import {solve} from "./part_two";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";
import {example} from "./index";

describe(`02 - Part II example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(900);
  });
});

describe(`02 - Part II solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("02.txt"))).to.equal(1960569556);
  });
});
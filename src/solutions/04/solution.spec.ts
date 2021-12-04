import {expect} from "chai";
import "../../extensions/string.extensions";
import {readInput} from "../../util/util";
import {findFirstWinner, findLastWinner, solve} from "./solution";
import {example} from "./index";

describe(`04 - Part I example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example, findFirstWinner)).to.equal(4512);
  });
});

describe(`04 - Part I solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInput("04.txt"), findFirstWinner)).to.equal(50008);
  });
});

describe(`04 - Part II example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example, findLastWinner)).to.equal(1924);
  });
});

describe(`04 - Part II solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInput("04.txt"), findLastWinner)).to.equal(17408);
  });
});

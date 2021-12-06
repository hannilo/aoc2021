import {expect} from "chai";
import {readInput} from "../../util/util";
import {example} from "./index";
import {solve} from "./solution";

describe(`06 - Part I example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example, 18)).to.equal(26);
    expect(solve(example, 80)).to.equal(5934);
  });
});


describe(`06 - Part I solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInput("06.txt"), 80)).to.equal(349549);
  });
});


describe(`06 - Part II example`, () => {
  it(`should find solution`, async () => {
    expect(solve(example, 256)).to.equal(26984457539);
  });
});

describe(`06 - Part II solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInput("06.txt"), 256)).to.equal(1589590444365);
  });
});

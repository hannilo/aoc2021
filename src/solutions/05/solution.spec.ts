import {expect} from "chai";
import {readInputLines} from "../../util/util";
import {example} from "./index";
import {solve} from "./solution";

describe(`05 - Part I example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines(), false)).to.equal(5);
  });
});

describe(`05 - Part I solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("05.txt"), false)).to.equal(4745);
  });
});


describe(`05 - Part II example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines(), true)).to.equal(12);
  });
});

describe(`05 - Part II solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("05.txt"), true)).to.equal(18442);
  });
});
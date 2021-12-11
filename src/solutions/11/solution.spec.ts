import {expect} from "chai";
import {example, Grid} from "./index";
import "../../extensions/string.extensions";
import {solve, solvePt2} from "./solution";
import {readInputLines} from "../../util/util";

describe(`11 - Part I neighbors`, () => {
  it(`should find all neighbors`, async () => {
    const g = new Grid(example.splitLines());
    let n = g.getNeighbors(0, 0);
    expect(n.length).to.equal(3);
    n = g.getNeighbors(1, 1);
    expect(n.length).to.equal(8);
  });
});

describe(`11 - Part I triggering neighbors`, () => {
  it(`should trigger neighbors to flash`, async () => {
    const init =
      "11111\n" +
      "19991\n" +
      "19191\n" +
      "19991\n" +
      "11111";

    const g = new Grid(init.splitLines());

    const afterStep1 =
      "34543\n" +
      "40004\n" +
      "50005\n" +
      "40004\n" +
      "34543"
    g.stepForward()
    expect(g.toString()).to.equal(afterStep1);

    const afterStep2 =
      "45654\n" +
      "51115\n" +
      "61116\n" +
      "51115\n" +
      "45654"
    g.stepForward()
    expect(g.toString()).to.equal(afterStep2);
  });
});

describe(`11 - Part I example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(1656);
  });
});

describe(`11 - Part I solution`, () => {
  it(`should solve input`, async () => {
    expect(solve(readInputLines("11.txt"))).to.equal(1681);
  });
});

describe(`11 - Part II example`, () => {
  it(`should solve example`, async () => {
    expect(solvePt2(example.splitLines())).to.equal(195);
  });
});

describe(`11 - Part II solution`, () => {
  it(`should solve input`, async () => {
    expect(solvePt2(readInputLines("11.txt"))).to.equal(276);
  });
});

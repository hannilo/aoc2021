import {expect} from "chai";
import {readInput} from "../../util/util";
import {example, parseInputLine} from "./index";
import {calcAlignmentFuelLinear, calcAlingmentFuelExponential, solve} from "./solution";


describe(`07 - Part I calculation`, () => {
  it(`should calculate fuel expenditure`, async () => {
    expect(calcAlignmentFuelLinear(parseInputLine(example), 2)).to.equal(37);
    expect(calcAlignmentFuelLinear(parseInputLine(example), 1)).to.equal(41);
    expect(calcAlignmentFuelLinear(parseInputLine(example), 3)).to.equal(39);
    expect(calcAlignmentFuelLinear(parseInputLine(example), 10)).to.equal(71);
  });
});


describe(`07 - Part I example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example, calcAlignmentFuelLinear)).to.equal(37);
  });
});


describe(`07 - Part I solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInput("07.txt"), calcAlignmentFuelLinear)).to.equal(333755);
  });
});

describe(`07 - Part II calculation`, () => {
  it(`should calculate fuel expenditure`, async () => {
    expect(calcAlingmentFuelExponential(parseInputLine(example), 5)).to.equal(168);
    expect(calcAlingmentFuelExponential(parseInputLine(example), 2)).to.equal(206);
  });
});

describe(`07 - Part II example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example, calcAlingmentFuelExponential)).to.equal(168);
  });
});


describe(`07 - Part II solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInput("07.txt"), calcAlingmentFuelExponential)).to.equal(94017638);
  });
});

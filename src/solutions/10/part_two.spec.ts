import {expect} from "chai";
import {example} from "./index";
import {complete, solve} from "./part_two";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";


describe(`10 - Part II completion`, () => {
  it(`should complete lines`, async () => {
    expect(complete("[({(<(())[]>[[{[]{<()<>>")).to.equal("}}]])})]");
    expect(complete("[(()[<>])]({[<{<<[]>>(")).to.equal(")}>]})");
    expect(complete("(((({<>}<{<{<>}{[]{[]{}")).to.equal("}}>}>))))");
    expect(complete("{<[[]]>}<{[{[{[]{()[[[]")).to.equal("]]}}]}]}>");
    expect(complete("<{([{{}}[<[[[<>{}]]]>[]]")).to.equal("])}>");
  });
});

describe(`10 - Part II example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(288957);
  });
});

describe(`10 - Part II solution`, () => {
  it(`should solve input`, async () => {
    expect(solve(readInputLines("10.txt"))).to.equal(3354640192);
  });
});

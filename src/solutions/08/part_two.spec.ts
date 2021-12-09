import {expect} from "chai";
import "../../extensions/string.extensions";
import {findFrequencies, findLineMapping, solve} from "./part_two";
import {readInputLines} from "../../util/util";
import {example} from "./index";

describe(`08 - Part II frequencies`, () => {
  it(`should find char frequencies in list of strings`, async () => {
    const f = findFrequencies("cgeb fdcge fecdb fabcd".split(" "));
    expect(f.size).to.equal(7);
    expect(f.get("a")).to.equal(1);
    expect(f.get("g")).to.equal(2);
    expect(f.get("c")).to.equal(4);
  });
});

describe(`08 - Part II row mapping`, () => {
  it(`should find number mapping for line`, async () => {
    const f = findLineMapping("acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab".split(" "));
    expect(f.get("ab")).to.equal("1");
    expect(f.get("dab")).to.equal("7");
    expect(f.get("eafb")).to.equal("4");
    expect(f.get("acedgfb")).to.equal("8");

    expect(f.get("gcdfa")).to.equal("2");
    expect(f.get("cdfbe")).to.equal("5");
    expect(f.get("fbcad")).to.equal("3");

    expect(f.get("cagedb")).to.equal("0");
    expect(f.get("cefabd")).to.equal("9");
    expect(f.get("cdfgeb")).to.equal("6");
  });
});


describe(`08 - Part II example 1`, () => {
  it(`should solve example 1`, async () => {
    expect(solve(["acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf"])).to.equal(5353);
  });
});

describe(`08 - Part II example 2`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(61229);
  });
});


describe(`08 - Part II solution`, () => {
  it(`should find solution`, async () => {
    expect(solve(readInputLines("08.txt"))).to.equal(996280);
  });
});

import {describe} from "mocha";
import {expect} from "chai";
import {buildPair, magnitude} from "./index";

describe("18 - part I operations", () => {
  it("calculates single magnitude", async () => {
    expect(magnitude([9, 1])).to.equal(29);
    expect(magnitude([1, 9])).to.equal(21);
  });
  it("builds a pair", async () => {
    const p = buildPair("[1,2]");
    expect(p.children[0].value).to.equal(1);
    expect(p.children[1].value).to.equal(2);
  });
  it("builds a left nested pair", async () => {
    const p = buildPair("[[1,2],3]");
    expect(p.children[0].children[0].value).to.equal(1);
    expect(p.children[0].children[1].value).to.equal(2);
    expect(p.children[1].value).to.equal(3);
  });
  it("builds a right nested pair", async () => {
    const p = buildPair("[9,[8,7]]");
    expect(p.children[0].value).to.equal(9);
    expect(p.children[1].children[0].value).to.equal(8);
    expect(p.children[1].children[1].value).to.equal(7);
  });
  it("builds a double nested pair", async () => {
    const p = buildPair("[[11,99],[88,55]]");
    expect(p.children[0].children[0].value).to.equal(11);
    expect(p.children[0].children[1].value).to.equal(99);
    expect(p.children[1].children[0].value).to.equal(88);
    expect(p.children[1].children[1].value).to.equal(55);
  });
  it("builds a nested pair", async () => {
    const i = "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]";
    const p = buildPair(i);
    console.log(p.toString());
    expect(p.toString()).to.equal(i);
  });
});
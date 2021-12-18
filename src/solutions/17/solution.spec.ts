import {describe} from "mocha";
import {expect} from "chai";
import {example, findMaxVY0, calcPossibleStepsToTarget, parseTargetArea, findPossibleVY0s, findXCoord} from "./index";
import {readInput} from "../../util/util";
import {gaussSum} from "../../math";

describe("17 - part I", () => {
  it("parses target area", async () => {
    const target = parseTargetArea(example);
    const min = target[0];
    const max = target[1];
    expect(min.x).to.equal(20);
    expect(min.y).to.equal(-10);
    expect(max.x).to.equal(30);
    expect(max.y).to.equal(-5);
  });
  it("finds Y velocity", async () => {
    const target = parseTargetArea(example);
    const y = findMaxVY0(target);
    expect(y).to.equal(9);
    expect(gaussSum(y)).to.equal(45);
  });

});

describe("17 - part I solution", () => {
  it("parses target area", async () => {
    const target = parseTargetArea(readInput("17.txt"));
    const y = findMaxVY0(target);
    expect(gaussSum(y)).to.equal(15931);
  });
});

describe("17 - part II", () => {
  it("finds steps to target given initial vY", async () => {
    const target = parseTargetArea(example);
    expect(calcPossibleStepsToTarget(target, 2)).to.eql([7]);
    expect(calcPossibleStepsToTarget(target, 3)).to.eql([9]);
    expect(calcPossibleStepsToTarget(target, 0)).to.eql([4, 5]);
    expect(calcPossibleStepsToTarget(target, -1)).to.eql([3, 4]);
    expect(calcPossibleStepsToTarget(target, -2)).to.eql([2, 3]);
    expect(calcPossibleStepsToTarget(target, -3)).to.eql([2]);
  });
  it("finds x coord after n steps", async () => {
    expect(findXCoord(6, 1)).to.equal(6);
    expect(findXCoord(6, 2)).to.equal(11);
    expect(findXCoord(6, 3)).to.equal(15);
    expect(findXCoord(6, 4)).to.equal(18);
    expect(findXCoord(6, 5)).to.equal(20);
    expect(findXCoord(6, 6)).to.equal(21);
    expect(findXCoord(6, 7)).to.equal(21);

    expect(findXCoord(6, 7)).to.equal(21);
  });
  it("finds possible vY values", async () => {
    const target = parseTargetArea(example);
    const solutions = findPossibleVY0s(target);
    expect(solutions.size).to.equal(112);
  });
});

describe("17 - part II solution", () => {
  it("solves input", async () => {
    const target = parseTargetArea(readInput("17.txt"));
    const solutions = findPossibleVY0s(target);
    expect(solutions.size).to.equal(2555);
  });
});

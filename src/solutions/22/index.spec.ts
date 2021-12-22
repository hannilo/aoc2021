import {describe} from "mocha";
import {expect} from "chai";
import {example, parseStep, Reactor} from "./index";
import {readInputLines} from "../../util/util";

describe("22 - part I", () => {
  it("parses step", async () => {
    const on = parseStep("on x=-20..33,y=-21..23,z=-26..28");
    expect(on.on).to.equal(true);
    expect(on.xMin).to.equal(-20);
    expect(on.xMax).to.equal(33);
    expect(on.yMin).to.equal(-21);
    expect(on.yMax).to.equal(23);
    expect(on.zMin).to.equal(-26);
    expect(on.zMax).to.equal(28);
  });
  it("reactor steps", async () => {
    let step = parseStep("on x=10..12,y=10..12,z=10..12");
    const area = parseStep("on x=-50..50,y=-50..50,z=-50..50");
    const reactor = new Reactor();

    const s1 = reactor.step(step, area);
    expect(s1).to.equal(27);

    step = parseStep("on x=11..13,y=11..13,z=11..13");
    expect(reactor.step(step, area)).to.equal(46);

    step = parseStep("off x=9..11,y=9..11,z=9..11");
    expect(reactor.step(step, area)).to.equal(38);

    step = parseStep("on x=10..10,y=10..10,z=10..10");
    expect(reactor.step(step, area)).to.equal(39);
  });
});

describe("22 - part I solution", () => {
  it("solves example", async () => {
    const steps = example.splitLines().map(parseStep);
    const area = parseStep("on x=-50..50,y=-50..50,z=-50..50");
    const reactor = new Reactor();
    steps.forEach(s => {
      reactor.step(s, area);
    });
    expect(reactor.onCuboids.size).to.equal(590784);
  });
  it("solves input", async () => {
    const steps = readInputLines("22.txt").map(parseStep);
    const area = parseStep("on x=-50..50,y=-50..50,z=-50..50");
    const reactor = new Reactor();
    steps.forEach(s => {
      reactor.step(s, area);
    });
    expect(reactor.onCuboids.size).to.equal(647076);
  });
});

describe("22 - part II solution", () => {
  it("solves example", async () => {
    const steps = readInputLines("22_2.txt").map(parseStep);
    const area = parseStep("on x=-999999..999999,y=-999999..999999,z=-999999..999999");
    const reactor = new Reactor();
    steps.forEach((s, i) => {
      const l = reactor.step(s, area);
      console.log(i, ":", l)
    });
    expect(reactor.onCuboids.size).to.equal(590784);
  });
  it("solves input", async () => {
    const steps = readInputLines("22.txt").map(parseStep);
    const area = parseStep("on x=-999999..999999,y=-999999..999999,z=-999999..999999");
    const reactor = new Reactor();
    steps.forEach(s => {
      reactor.step(s, area);
    });
    expect(reactor.onCuboids.size).to.equal(647076);
  });
});
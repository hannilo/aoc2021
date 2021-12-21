import {describe} from "mocha";
import {expect} from "chai";
import {DeterministicDice, play, playDirac, roll} from "./index";

describe("21 - part I dice", () => {
  it("just for fun", async () => {
    const d = new DeterministicDice(100);
    expect(d.roll()).to.equal(1);
    expect(d.rollN(3)).to.eql([2, 3, 4]);
    d.rollN(93)
    expect(d.rollN(6)).to.eql([98, 99, 100, 1, 2, 3]);
  });
  it("quick roll", async () => {
    const r = roll(1)
    expect(r.next).to.equal(4);
    expect(r.total).to.equal(6);
  });
  it("plays a game", async () => {
    const r = play(4, 8)
    expect(r.scores).to.eql([1000, 745])
    expect(r.rolls).to.eql(993)
    expect(Math.min(...r.scores) * r.rolls).to.equal(739785)
  });
});


describe("21 - part I solution", () => {
  it("solution", async () => {
    const r = play(6, 3)
    expect(Math.min(...r.scores) * r.rolls).to.equal(752745)
  });
});

describe("21 - part II", () => {
  it("example", async () => {
    const r = playDirac(4, 8)
    expect(r[0]).to.equal(444356092776315)
    expect(r[1]).to.equal(341960390180808)
  });
  it("solution", async () => {
    const r = playDirac(6, 3)
    expect(r[0]).to.equal(309196008717909)
    expect(r[1]).to.equal(227643103580178)
  });
});



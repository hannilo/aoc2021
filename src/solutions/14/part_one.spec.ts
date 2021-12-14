import {frequencyMaximum, frequencyMinimum, readInput, splitChunks} from "../../util/util";
import {expect} from "chai";
import {example} from "./index";
import {PolymerizationModule} from "./part_one";

describe(`14 - Part I parse`, () => {
  const chunks = <[string[], string[]]>splitChunks(example);
  const p = new PolymerizationModule(chunks[0][0], chunks[1]);
  it(`should parse input`, async () => {
    expect(p.polymer.join("")).to.equal("NNCB");
  });
  it(`should retain rules`, async () => {
    expect(p.getRule("CH")).to.equal("B");
    expect(p.getRule("CN")).to.equal("C");
  });
});

describe(`14 - Part I step`, () => {
  const chunks = <[string[], string[]]>splitChunks(example);
  const p = new PolymerizationModule(chunks[0][0], chunks[1]);
  it(`should step once`, async () => {
    p.step()
    expect(p.polymer.join("")).to.equal("NCNBCHB");
  });
  it(`should retain previous step`, async () => {
    p.step()
    expect(p.polymer.join("")).to.equal("NBCCNBBBCBHCB");
  });
});

describe(`14 - Part I example`, () => {
  const chunks = <[string[], string[]]>splitChunks(example);
  const p = new PolymerizationModule(chunks[0][0], chunks[1]);
  it(`should solve example`, async () => {
    for (let step = 0; step < 10; step++) {
      p.step()
    }
    const freqs = p.getFrequencies()
    const min = frequencyMinimum(freqs)
    const max = frequencyMaximum(freqs)
    expect(min.length).to.equal(1);
    expect(min[0][0]).to.equal("H");
    expect(min[0][1]).to.equal(161);

    expect(max.length).to.equal(1);
    expect(max[0][0]).to.equal("B");
    expect(max[0][1]).to.equal(1749);
  });
});

describe(`14 - Part I solution`, () => {
  const chunks = <[string[], string[]]>splitChunks(readInput("14.txt"));
  const p = new PolymerizationModule(chunks[0][0], chunks[1]);
  it(`should solve input`, async () => {
    for (let step = 0; step < 10; step++) {
      p.step()
    }
    const freqs = p.getFrequencies()
    const min = frequencyMinimum(freqs)
    const max = frequencyMaximum(freqs)
    expect(min.length).to.equal(1);
    expect(max.length).to.equal(1);

    expect(max[0][1] - min[0][1]).to.equal(2027)
  });
});

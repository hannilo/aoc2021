import {frequencyMaximum, frequencyMinimum, getFrequencies, readInput, splitChunks} from "../../util/util";
import {example} from "./index";
import {expect} from "chai";
import {PolymerizationFrequencyModule} from "./part_two";

describe(`14 - Part II parse`, () => {
  it(`should retain frequencies`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const p = new PolymerizationFrequencyModule(chunks[0][0], chunks[1]);
    expect(p.getMapKeys().length).to.equal(3);
  });
  it(`should retain rules`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const p = new PolymerizationFrequencyModule(chunks[0][0], chunks[1]);
    expect(p.getRule("CH")).to.equal("B");
    expect(p.getRule("CN")).to.equal("C");
  });
  it(`should find letter frequencies`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const p = new PolymerizationFrequencyModule(chunks[0][0], chunks[1]);
    const letterFreq = p.getLetterFreq()
    expect(letterFreq.size).to.equal(3);
  });
});

describe(`14 - Part II step`, () => {
  it(`should step once`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const p = new PolymerizationFrequencyModule(chunks[0][0], chunks[1]);
    p.step()
    expect(p.getMapKeys().length).to.equal(6);
    const letters = p.getLetterFreq()
    const expectedFreqs = getFrequencies([..."NCNBCHB"])
    console.log(expectedFreqs)
    expect(letters.size).to.equal(4);
    expect(letters.get("N")).to.equal(expectedFreqs.get("N"))
  });
  it(`should retain previous step`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const p = new PolymerizationFrequencyModule("NBCCNBBBCBHCB", chunks[1]);
    p.step()
    expect(p.getMapKeys().length).to.equal(11);
    const letters = p.getLetterFreq()
    const expectedFreqs = getFrequencies([..."NBBBCNCCNBBNBNBBCHBHHBCHB"])
    console.log(expectedFreqs)
    expect(letters.size).to.equal(4);
  });
});

describe(`14 - Part II example`, () => {
  it(`should solve example`, async () => {
    const chunks = <[string[], string[]]>splitChunks(example);
    const p = new PolymerizationFrequencyModule(chunks[0][0], chunks[1]);
    for (let i = 0; i < 40; i++) {
      p.step()
    }
    const letterFreq = p.getLetterFreq()
    const min = frequencyMinimum(letterFreq)
    expect(min.length).to.equal(1);
    expect(min[0]).to.eql(["H", 3849876073]);
    const max = frequencyMaximum(letterFreq)
    expect(max.length).to.equal(1)
    expect(max[0]).to.eql(["B", 2192039569602]);
    expect(max[0][1] - min[0][1]).to.equal(2188189693529)
  });
});

describe(`14 - Part II solution`, () => {
  it(`should solve input`, async () => {
    const chunks = <[string[], string[]]>splitChunks(readInput("14.txt"));
    const p = new PolymerizationFrequencyModule(chunks[0][0], chunks[1]);
    for (let i = 0; i < 40; i++) {
      p.step()
    }
    const letterFreq = p.getLetterFreq()
    const min = frequencyMinimum(letterFreq)
    expect(min.length).to.equal(1);
    expect(min[0]).to.eql(["P", 1049062127367]);
    const max = frequencyMaximum(letterFreq)
    expect(max.length).to.equal(1)
    expect(max[0]).to.eql(["N", 3314101589104]);
    expect(max[0][1] - min[0][1]).to.equal(2265039461737)
  });
});
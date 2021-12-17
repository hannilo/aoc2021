export class PolymerizationFrequencyModule {

  private readonly template: string;
  private frequencyMap: Map<string, number> = new Map<string, number>();
  private readonly rules: Map<string, string> = new Map<string, string>();

  constructor(template: string, ruleLines: string[]) {
    this.template = template;
    ruleLines.forEach(s => {
      const sp = <[string, string]>s.split(" -> ");
      this.rules.set(sp[0], sp[1]);
    });
    for (let i = 1; i < template.length; i++) {
      const k = template[i - 1] + template[i];
      if (this.frequencyMap.has(k)) {
        this.frequencyMap.set(k, <number>this.frequencyMap.get(k) + 1);
      } else {
        this.frequencyMap.set(k, 1);
      }
    }
    console.log("PolymerizationFrequencyModule",this.frequencyMap, this.template);
  }

  step() {
    const newMap = new Map<string, number>();
    this.frequencyMap.forEach((oldFreq, oldPair) => {
      if (this.rules.has(oldPair)) {
        const insert = <string>this.rules.get(oldPair);
        const newPairs = [[oldPair[0], insert].join(""), [insert, oldPair[1]].join("")];
        newPairs.forEach(p => {
          if (newMap.has(p)) {
            newMap.set(p, <number>newMap.get(p) + oldFreq);
          } else {
            newMap.set(p, oldFreq);
          }
        });
      } else {
        if (newMap.has(oldPair)) {
          newMap.set(oldPair, <number>newMap.get(oldPair) + oldFreq);
        } else {
          newMap.set(oldPair, oldFreq);
        }
      }
    });
    this.frequencyMap = newMap;
  }

  getMapKeys(): string[] {
    return [...this.frequencyMap.keys()];
  }

  getLetterFreq() {
    const letterMap = new Map<string, number>();
    this.frequencyMap.forEach((value, key) => {
      //just check the first in the pair, add final char later
      const c = key[0];
      if (letterMap.has(c)) {
        letterMap.set(c, <number>letterMap.get(c) + value);
      } else {
        letterMap.set(c, value);
      }
    });
    letterMap.set(this.template[this.template.length - 1], <number>letterMap.get(this.template[this.template.length - 1]) + 1);
    console.log("letters", letterMap);
    return letterMap;
  }

  getRule(r: string): string | undefined {
    return this.rules.get(r);
  }
}
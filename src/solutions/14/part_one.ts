

export class PolymerizationModule {

  private _polymer: string[] = [];
  private readonly rules: Map<string, string> = new Map<string, string>();

  constructor(template: string, ruleLines: string[]) {
    this._polymer = [...template];
    ruleLines.forEach(s => {
      const sp = <[string, string]>s.split(" -> ");
      this.rules.set(sp[0], sp[1]);
    });
  }

  //luckily no threading problems here
  step() {
    const pending = [<string>this._polymer.shift()];
    while (this._polymer.length > 0) {
      const pair = pending[pending.length - 1] + this._polymer[0];
      const rule = this.rules.get(pair);
      if (rule) {
        pending.push(rule);
      }
      pending.push(<string>this._polymer.shift());
    }
    this._polymer = pending;
  }

  get polymer(): string[] {
    return [...this._polymer];
  }

  getRule(r: string): string | undefined {
    return this.rules.get(r);
  }

  getFrequencies(): Map<string, number> {
    const ret = new Map<string, number>();
    this.polymer.forEach(s => {
      if (ret.has(s)) {
        ret.set(s, <number>ret.get(s) + 1);
      } else {
        ret.set(s, 1);
      }
    });
    return ret;
  }
}

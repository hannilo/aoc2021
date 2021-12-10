import {expect} from "chai";
import "../../extensions/string.extensions";
import {solve, validate} from "./part_one";
import {example} from "./index";
import {readInputLines} from "../../util/util";

describe(`10 - Part I validation`, () => {
  it(`should low points`, async () => {
    let v = validate("{([(<{}[<>[]}>{[]{[(<()>");
    expect(v.valid).to.equal(false);
    expect(v.errIdx).to.equal(12);
    v = validate("[[<[([]))<([[{}[[()]]]");
    expect(v.valid).to.equal(false);
    expect(v.errIdx).to.equal(8);
    v = validate("[{[{({}]{}}([{[{{{}}([]");
    expect(v.valid).to.equal(false);
    expect(v.errIdx).to.equal(7);
    v = validate("[<(<(<(<{}))><([]([]()");
    expect(v.valid).to.equal(false);
    expect(v.errIdx).to.equal(10);
    v = validate("<{([([[(<>()){}]>(<<{{");
    expect(v.valid).to.equal(false);
    expect(v.errIdx).to.equal(16);
  });
});


describe(`10 - Part I example`, () => {
  it(`should solve example`, async () => {
    expect(solve(example.splitLines())).to.equal(26397);
  });
});

describe(`10 - Part I solution`, () => {
  it(`should solve input`, async () => {
    expect(solve(readInputLines("10.txt"))).to.equal(413733);
  });
});
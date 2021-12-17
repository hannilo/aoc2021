import {describe} from "mocha";
import {expect} from "chai";
import {convertToBinaryString, example, example1, example2, Packet} from "./index";
import {readInput} from "../../util/util";

describe("16 - parse", () => {
  it("parse - examples", async () => {
    expect(convertToBinaryString(example)).to.equal("110100101111111000101000");
    expect(convertToBinaryString(example1)).to.equal("11101110000000001101010000001100100000100011000001100000");
  });
  it("parse - literal packet", async () => {
    const p1 = new Packet(convertToBinaryString(example));
    expect(p1.stringValue()).to.equal("110100101111111000101");
    expect(p1.v).to.equal(6);
    expect(p1.isLit()).to.equal(true);
    expect(p1.value).to.equal(2021);
  });
  it("parse - operator packet", async () => {
    const p1 = new Packet(convertToBinaryString(example2));
    expect(p1.v).to.equal(1);
    expect(p1.isOp()).to.equal(true);
    expect(p1.contents[0].value).to.equal(10);
    expect(p1.contents[1].value).to.equal(20);

  });
  it("parse - nested operator packet", async () => {
    const p1 = new Packet(convertToBinaryString(example1));
    expect(p1.v).to.equal(7);
    expect(p1.isOp()).to.equal(true);
    expect(p1.contents.length).to.equal(3);
    expect(p1.contents[0].value).to.equal(1);
    expect(p1.contents[1].value).to.equal(2);
    expect(p1.contents[2].value).to.equal(3);
  });
  it("count version number", async () => {
    let p = new Packet(convertToBinaryString("8A004A801A8002F478"));
    expect(p.v).to.equal(4);
    expect(p.subPacketVersionSum() + p.v).to.equal(16);
    p = new Packet(convertToBinaryString("620080001611562C8802118E34"));
    expect(p.subPacketVersionSum() + p.v).to.equal(12);
    p = new Packet(convertToBinaryString("C0015000016115A2E0802F182340"));
    expect(p.subPacketVersionSum() + p.v).to.equal(23);
    p = new Packet(convertToBinaryString("A0016C880162017C3686B18A3D4780"));
    expect(p.subPacketVersionSum() + p.v).to.equal(31);
  });
});

describe("16 - part I solution", () => {
  it("should solve input", async () => {
    const p = new Packet(convertToBinaryString(readInput("16.txt")));
    expect(p.subPacketVersionSum() + p.v).to.equal(929);
  });
});

export const example = "D2FE28";
export const example1 = "EE00D40C823060";
export const example2 = "38006F45291200";
//export const example3 = "8A004A801A8002F478";

export const mapping: { [key: string]: string } = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  "A": "1010",
  "B": "1011",
  "C": "1100",
  "D": "1101",
  "E": "1110",
  "F": "1111",
};

export function convertToBinaryString(s: string): string {
  return [...s].map(c => mapping[c]).join("");
}

export class Packet {
  arr: string[];

  readonly v: number;
  readonly t: number;
  readonly contents: Packet[] = [];
  readonly value: number = -1;

  constructor(s: string) {
    this.arr = [...s];
    this.v = parseInt(this.slice(0, 3), 2);
    this.t = parseInt(this.slice(3, 6), 2);
    console.log(this.stringValue());
    console.log(this.v, this.slice(0, 3));

    if (this.isLit()) {
      this.value = this.readNumber(6);
      console.log("lit packet", this.value, "bits", this.arr.length);
    } else {
      if (this.arr[6] == "1") {
        const subPacketCount = parseInt(this.slice(7, 7 + 11), 2);
        const contentStart = 7 + 11;
        console.log("detected", subPacketCount, "sub-packets");
        this.contents = this.readSubPacketsByCount(contentStart, subPacketCount);
        const contentLength = this.contents.reduce((p, c) => p + c.arr.length, 0);
        this.arr = this.arr.slice(0, contentStart + contentLength);
      } else {
        const lenBits = 15;
        const contentStart = 15 + 7;
        const subPacketsLength = parseInt(this.slice(7, contentStart), 2);
        console.log("sub len", subPacketsLength, "from", lenBits, this.slice(7, contentStart));
        const subs = this.readSubPacketsBySize(contentStart, subPacketsLength);
        console.log("total subs", subs.length);
        this.arr = this.arr.slice(0, contentStart + subPacketsLength);
        this.contents = subs;
      }

    }
  }

  readSubPacketsByCount(startIdx: number, count: number): Packet[] {
    const ps: Packet[] = [];
    let ptr = startIdx;
    while (ps.length < count) {
      const p = new Packet(this.slice(ptr));
      ps.push(p);
      ptr += p.arr.length;
    }
    return ps;
  }

  readSubPacketsBySize(startIdx: number, len: number): Packet[] {
    const ps: Packet[] = [];
    let read = this.slice(startIdx, startIdx + len);
    console.log(this.v, "init read", read);
    while (read.length > 0) {
      const p = new Packet(read);
      ps.push(p);
      read = read.slice(p.arr.length);
      console.log(this.v, "read", read);
    }
    return ps;
  }

  readNumber(startIdx: number): number {
    let ptr = startIdx;
    let block = this.slice(ptr, ptr + 5);
    let res = "";
    while (block[0] == "1") {
      res = res + block.slice(1);
      ptr += 5;
      block = this.slice(ptr, ptr + 5);
    }
    res = res + block.slice(1);
    this.arr = this.arr.slice(0, ptr + 5);
    return parseInt(res, 2);
  }

  subPacketVersionSum(): number {
    return this.contents.map(p => p.subPacketVersionSum() + p.v).reduce((p, c) => p + c, 0);
  }

  slice(start: number, endExclusive?: number): string {
    return this.arr.slice(start, endExclusive).join("");
  }

  stringValue(): string {
    return this.arr.join("");
  }

  isOp() {
    return this.t != 4;
  }

  isLit() {
    return !this.isOp();
  }
}

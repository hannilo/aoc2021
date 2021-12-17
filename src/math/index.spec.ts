import {describe} from "mocha";
import {expect} from "chai";
import {HeapPriorityQueue} from "./index";

describe("math - priority queue", () => {
  it("should insert", async () => {
    const q = new HeapPriorityQueue();
    expect(q.size()).to.equal(0);
    q.insert("TWO", 2);
    q.insert("ONE", 1);
    q.insert("THREE", 3);
    q.insert("TWO", 2);
    q.insert("THREE", 3);
    expect(q.size()).to.equal(5);
  });
  it("should pop", async () => {
    const q = new HeapPriorityQueue();
    q.insert("TWO", 2);
    q.insert("ONE", 1);
    q.insert("THREE", 3);
    q.insert("TWO", 2);
    q.insert("THREE", 3);
    const r1 = q.peek();
    let r2 = q.pop();
    expect(r1).to.equal(r2);
    expect(r2).to.equal("ONE");
    expect(q.size()).to.equal(4);
    r2 = q.pop();
    expect(r2).to.equal("TWO");
  });
  it("should decrease", async () => {
    const q = new HeapPriorityQueue();
    expect(q.size()).to.equal(0);
    q.insert("TWO", 2);
    q.insert("MAX", 6);
    q.insert("THREE", 3);
    q.insert("TWO", 2);
    q.insert("THREE", 3);
    let m = q.peek()
    expect(m).to.equal("TWO")
    q.decrease("MAX", 6)
    m = q.pop()
    expect(m).to.equal("MAX")
    let t = q.pop()
    expect(t).to.equal("TWO")
    t = q.pop()
    expect(t).to.equal("TWO")
  });
});
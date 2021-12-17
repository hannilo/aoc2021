import {expect} from "chai";
import {example, Graph, Node, pathCost} from "./index";
import "../../extensions/string.extensions";
import {readInputLines} from "../../util/util";


describe(`15 - Part I parse`, () => {
  const g = new Graph(example.splitLines());
  it(`should parse input`, async () => {
    expect(g.nodes.size).to.equal(100);
  });
  it(`should should retain values`, async () => {
    expect(g.nodes.get("0:0")?.val).to.equal(1);
    expect(g.nodes.get("1:1")?.val).to.equal(3);
    expect(g.nodes.get("0:2")?.val).to.equal(6);
  });
});

describe(`15 - Part I dijkstra`, () => {
  const g = new Graph(example.splitLines());
  const p = g.dijkstra(<Node>g.nodes.get("0:0"), <Node>g.nodes.get("9:9"));
  it(`should find shortest path`, async () => {
    expect(p.length).to.equal(19);
  });
  it(`should get path cost`, async () => {
    expect(pathCost(p)).to.equal(40);
  });
});

describe(`15 - Part I solution`, () => {
  const g = new Graph(readInputLines("15.txt"));
  const target = `${g.height - 1}:${g.width - 1}`;
  const p = g.dijkstra(<Node>g.nodes.get("0:0"), <Node>g.nodes.get(target));
  it(`should find shortest path`, async () => {
    expect(p.length).to.equal(205);
  });
  it(`should get path cost`, async () => {
    expect(pathCost(p)).to.equal(386);
  });
});
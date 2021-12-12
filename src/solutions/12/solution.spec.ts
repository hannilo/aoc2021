import {expect} from "chai";
import "../../extensions/string.extensions";
import {example, example2, Graph, makePathV1, makePathV2, Node} from "./index";
import {readInputLines} from "../../util/util";

describe(`12 - Part I parse`, () => {
  it(`should create graph from input`, async () => {
    const g = new Graph(example.splitLines());
    console.log(g.nodes.keys());
    const keys = ['start', 'A', 'b', 'c', 'd', 'end'];
    expect([...g.nodes.keys()]).to.eql(keys);

  });
});

describe(`12 - Part I node`, () => {
  it(`should differentiate large and small`, async () => {
    const N = new Node("LA");
    expect(N.isLarge()).to.equal(true);
    const n = new Node("sm");
    expect(n.isLarge()).to.equal(false);
  });
});

describe(`12 - Part I examples`, () => {
  it(`should solve examples`, async () => {
    let g = new Graph(example.splitLines());
    expect(g.nodes.size).to.equal(6);
    let paths = g.findPaths(g.startNode(), g.endNode(), makePathV1);
    expect(paths.length).to.equal(10);

    g = new Graph(example2.splitLines());
    expect(g.nodes.size).to.equal(7);
    paths = g.findPaths(g.startNode(), g.endNode(), makePathV1);
    expect(paths.length).to.equal(19);
  });
});

describe(`12 - Part I solution`, () => {
  it(`should solve input`, async () => {
    const g = new Graph(readInputLines("12.txt"));
    const paths = g.findPaths(g.startNode(), g.endNode(), makePathV1);
    expect(paths.length).to.equal(3298);
  });
});

describe(`12 - Part II example`, () => {
  it(`should solve example`, async () => {
    const g = new Graph(example.splitLines());
    const paths = g.findPaths(g.startNode(), g.endNode(), makePathV2);
    expect(paths.length).to.equal(36);
  });
});

describe(`12 - Part II solution`, () => {
  it(`should solve input`, async () => {
    const g = new Graph(readInputLines("12.txt"));
    const paths = g.findPaths(g.startNode(), g.endNode(), makePathV2);
    expect(paths.length).to.equal(93572);
  });
});

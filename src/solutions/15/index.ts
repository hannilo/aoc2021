import {Coord, coordToKey, keyToCoord} from "../../math/coordinates";
import {HeapPriorityQueue} from "../../math";

export const example =
  "1163751742\n" +
  "1381373672\n" +
  "2136511328\n" +
  "3694931569\n" +
  "7463417111\n" +
  "1319128137\n" +
  "1359912421\n" +
  "3125421639\n" +
  "1293138521\n" +
  "2311944581";

export class Node {
  readonly c: Coord;
  readonly val: number;

  constructor(c: Coord, val: number) {
    this.c = c;
    this.val = val;
  }
}

export class Graph {
  nodes: Map<string, Node> = new Map<string, Node>();
  readonly height: number;
  readonly width: number;
  readonly expanded: boolean;

  constructor(input: string[], expanded: boolean) {
    this.expanded = expanded;
    this.height = input.length;
    this.width = input[0].length;
    input.forEach((s, y) => {
      [...s].forEach((c, x) => {
        const k = `${y}:${x}`;
        //could do on-the-fly calculations but this is so much faster to implement
        //and at a scale of 5x theres no real difference
        if (this.expanded) {
          for (let my = 0; my < 5; my++) {
            for (let mx = 0; mx < 5; mx++) {
              const mk = `${my * this.height + y}:${mx * this.width + x}`;
              let val = (my + mx + parseInt(c, 10));
              val = val > 9 ? val % 9 : val;
              this.nodes.set(mk, new Node(keyToCoord(mk), val));
            }
          }
        } else {
          this.nodes.set(k, new Node(keyToCoord(k), parseInt(c, 10)));
        }
      });
    });
    if (this.expanded) {
      this.height = this.height * 5;
      this.width = this.width * 5;
    }
  }

  getNeighbors(row: number, col: number): Coord[] {
    const coords: Coord[] = [];
    if (row < this.height - 1) coords.push({y: row + 1, x: col});
    if (row > 0) coords.push({y: row - 1, x: col});
    if (col < this.width - 1) coords.push({y: row, x: col + 1});
    if (col > 0) coords.push({y: row, x: col - 1});
    return coords;
  }

  dijkstra(source: Node, target: Node): Node[] {
    //from source to nodes[key]
    const distance: Map<string, number> = new Map();
    //previous in shortest path
    const prev: Map<string, string | undefined> = new Map();
    //const toVisit: Set<string> = new Set();
    const toVisit: HeapPriorityQueue<string> = new HeapPriorityQueue();

    this.nodes.forEach((_value, key) => {
      distance.set(key, this.nodes.size);
      prev.set(key, undefined);
      toVisit.insert(key, <number>distance.get(key));
    });
    distance.set(coordToKey(source.c), 0);
    toVisit.decrease(coordToKey(source.c), this.nodes.size);

    while (toVisit.size() > 0) {
      //should use a priority queue - part II - no point in running this
      const curr = toVisit.pop();
      if (curr == coordToKey(target.c)) {
        break;
      }
      const coord = keyToCoord(curr);
      const nbs = this.getNeighbors(coord.y, coord.x);
      nbs.forEach(c => {
        const nbK = coordToKey(c);
        if (toVisit.has(nbK)) {
          const altLen = <number>distance.get(curr) + <number>this.nodes.get(nbK)?.val;
          if (altLen < <number>distance.get(nbK)) {
            toVisit.decrease(nbK, <number>distance.get(nbK) - altLen);
            distance.set(nbK, altLen);
            prev.set(nbK, curr);
          }
        }
      });
    }

    const result: Node[] = [<Node>this.nodes.get(coordToKey(target.c))];
    while (coordToKey(result[result.length - 1].c) != coordToKey(source.c)) {
      result.push(<Node>this.nodes.get(<string>prev.get(coordToKey(result[result.length - 1].c))));
    }
    return result.reverse();
  }
}

export function pathCost(n: Node[]): number {
  return n.slice(1,).reduce((p, c) => p + c.val, 0);
}

// function mapMinimum<T>(m: Map<T, number>): T {
//   let minVal = Infinity;
//   let minKey = undefined;
//   [...m.entries()].forEach(e => {
//     if (e[1] < minVal) {
//       minVal = e[1];
//       minKey = e[0];
//     }
//   });
//   return <T><unknown>minKey;
// }


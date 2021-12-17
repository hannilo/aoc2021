import {Coord, coordToKey, keyToCoord} from "../../math/coordinates";

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

  constructor(input: string[]) {
    this.height = input.length;
    this.width = input[0].length;
    input.forEach((s, y) => {
      [...s].forEach((c, x) => {
        const k = `${y}:${x}`;
        this.nodes.set(k, new Node(keyToCoord(k), parseInt(c)));
      });
    });
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
    const toVisit: Set<string> = new Set();

    this.nodes.forEach((_value, key) => {
      distance.set(key, Infinity);
      prev.set(key, undefined);
      toVisit.add(key);
    });
    distance.set(coordToKey(source.c), 0);

    while (toVisit.size > 0) {
      //should use a priority queue
      let curr = "";
      let minDist = Infinity;
      toVisit.forEach(s => {
        if (<number>distance.get(s) < minDist) {
          minDist = <number>distance.get(s);
          curr = s;
        }
      });
      if (curr == coordToKey(target.c)) {
        break;
      }

      toVisit.delete(curr);
      const coord = keyToCoord(curr);
      const nbs = this.getNeighbors(coord.y, coord.x);
      nbs.forEach(c => {
        const k = coordToKey(c);
        if (toVisit.has(k)) {
          const altLen = <number>distance.get(curr) + <number>this.nodes.get(k)?.val;
          if (altLen < <number>distance.get(k)) {
            distance.set(k, altLen);
            prev.set(k, curr);
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
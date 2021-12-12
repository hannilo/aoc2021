export const example =
  "start-A\n" +
  "start-b\n" +
  "A-c\n" +
  "A-b\n" +
  "b-d\n" +
  "A-end\n" +
  "b-end";

export const example2 =
  "dc-end\n" +
  "HN-start\n" +
  "start-kj\n" +
  "dc-start\n" +
  "dc-HN\n" +
  "LN-dc\n" +
  "HN-end\n" +
  "kj-sa\n" +
  "kj-HN\n" +
  "kj-dc";

export const START = "start";
export const END = "end";

export class Node {

  readonly key: string;
  private _neighbors: Set<Node> = new Set();

  constructor(key: string) {
    this.key = key;
  }

  link(n: Node) {
    if (!this.neighbors.has(n)) {
      this._neighbors.add(n);
      n.link(this);
    }
  }

  isLarge() {
    return !!this.key.match("[A-Z]+");
  }

  get neighbors(): Set<Node> {
    return this._neighbors;
  }

  readonly toString = (): string => {
    return this.key;
  };
}

interface Path {
  readonly path: Node[];

  getPath(): Node[];

  canVisit(n: Node): boolean;

  add(n: Node): void;

  last(): Node;

  copy(): Path;
}

export class PathV1 implements Path {
  readonly path: Node[];
  protected keys: Set<string> = new Set();

  constructor(init: Node[]) {
    this.path = [...init];
    this.path.forEach(n => {
      this.keys.add(n.key);
    });
  }

  //copy of path
  getPath(): Node[] {
    return [...this.path];
  }

  //visit is allowed if target is large or has not been visited
  canVisit(n: Node): boolean {
    return n.isLarge() ? true : !this.keys.has(n.key);
  }

  add(n: Node) {
    if (!n.isLarge() && this.keys.has(n.key)) {
      throw Error("trying to add existing small node");
    }
    this.keys.add(n.key);
    this.path.push(n);
  }

  last() {
    return this.path[this.path.length - 1];
  }

  copy() {
    return new PathV1(this.path);
  }

  readonly toString = (): string => {
    return this.path.map(n => n.key).join(",");
  };

}

export class PathV2 extends PathV1 {

  //could use frequency map
  repeatFlag = "";

  constructor(init: Node[], repeated: string) {
    super(init);
    this.repeatFlag = repeated;
  }

  canVisit(n: Node): boolean {
    if (n.isLarge()) {
      //large can be visited any number of times
      return true;
    } else if (this.keys.has(n.key)) {
      if (n.key == START) return false;
      return !this.repeatFlag;
    } else {
      return true;
    }
  }

  add(n: Node) {
    if (!n.isLarge() && this.keys.has(n.key)) {
      if (this.repeatFlag) {
        throw Error("trying to add existing small node");
      } else {
        this.repeatFlag = n.key;
      }
    }
    this.keys.add(n.key);
    this.path.push(n);
  }

  copy(): PathV2 {
    return new PathV2(this.path, this.repeatFlag);
  }
}

export function makePathV1(init: Node[]): PathV1 {
  return new PathV1(init);
}

export function makePathV2(init: Node[]): PathV2 {
  return new PathV2(init, "");
}

export class Graph {

  private _nodes: Map<string, Node> = new Map<string, Node>();

  constructor(input: string[]) {
    input.forEach(value => {
      const split = value.split("-");
      if (split.length != 2) throw Error("invalid line " + value);
      const firstKey = <string>split[0];
      let firstNode: Node;
      if (this._nodes.has(firstKey)) {
        firstNode = <Node>this._nodes.get(firstKey);
      } else {
        firstNode = new Node(firstKey);
        this._nodes.set(firstNode.key, firstNode);
      }
      const secondKey = <string>split[1];
      let secondNode: Node;
      if (this._nodes.has(secondKey)) {
        secondNode = <Node>this._nodes.get(secondKey);
      } else {
        secondNode = new Node(secondKey);
        this._nodes.set(secondNode.key, secondNode);
      }
      firstNode.link(secondNode);
    });

  }

  get nodes(): Map<string, Node> {
    return this._nodes;
  }

  startNode(): Node {
    return <Node>this._nodes.get(START);
  }

  endNode(): Node {
    return <Node>this._nodes.get(END);
  }

  findPaths(from: Node, to: Node, pathMaker: ((p: Node[]) => Path)): Path[] {
    const finishedPaths: Path[] = [];
    const pendingPaths: Path[] = [];
    from.neighbors.forEach(n => {
      pendingPaths.push(pathMaker([from, n]));
    });

    while (pendingPaths.length > 0) {
      const path = <Path>pendingPaths.pop();
      const last = path.last();
      last.neighbors.forEach(n => {
        if (n.key == to.key) {
          const newPath = path.copy();
          newPath.add(n);
          finishedPaths.push(newPath);
        } else if (path.canVisit(n)) {
          const newPath = path.copy();
          newPath.add(n);
          pendingPaths.push(newPath);
        }
      });
    }

    return finishedPaths;
  }

}

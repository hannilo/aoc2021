export const example =
  "[1,2]\n" +
  "[[1,2],3]\n" +
  "[9,[8,7]]\n" +
  "[[1,9],[8,5]]\n" +
  "[[[[1,2],[3,4]],[[5,6],[7,8]]],9]\n" +
  "[[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]\n" +
  "[[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]";

export function magnitude(pair: [number, number]): number {
  return 3 * pair[0] + 2 * pair[1];
}


export class Pair {
  parent: Pair | undefined = undefined;
  children: Pair[] = [];
  value = -1;

  isValue(): boolean {
    return this.value > -1;
  }

  toString = (): string => {
    if (this.isValue()) {
      return this.value.toString(10);
    } else {
      return "[" + this.children.map(c => c.toString()).join(",") + "]";
    }
  };
}


export type Tree = {
  root: Pair;
}

export function addTrees(t1: Tree, t2: Tree): Tree {
  const root = new Pair();
  root.children.push(t1.root, t2.root);
  root.children.forEach(r => {
    r.parent = root;
  });
  return {root: root};
}

//O(n) scan of string
export function buildPair(input: string): Pair {
  const root = new Pair();
  const chars = [...input];
  if (chars.shift() != "[") throw Error("malformed start");
  if (chars.pop() != "]") throw Error("malformed end");
  let parent = root;
  while (chars.length > 0) {
    const c = <string>chars.shift();
    if (c == "[") {
      const n = new Pair();
      n.parent = parent;
      parent.children.push(n);
      parent = n;
    } else if (c == "]") {
      if (!parent.parent) {
        if (chars.length != 0) {
          throw Error("reached end of pairs, but not end of string");
        } else {
          return root;
        }
      }
      parent = parent.parent;
    } else if (c.match("\\d")) {
      let n = c;
      for (let j = 0; j < chars.length; j++) {
        if (chars[j].match("\\d")) {
          n += chars.shift();
        } else {
          break;
        }
      }
      const p = new Pair();
      p.value = parseInt(n, 10);
      parent.children.push(p);
    }
  }

  return root;
}



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

  isContainer(): boolean {
    return this.children.length == 2;
  }

  toString = (): string => {
    if (this.isValue()) {
      return this.value.toString(10);
    } else {
      return "[" + this.children.map(c => c?.toString()).join(",") + "]";
    }
  };
}


export type Tree = {
  root: Pair;
}

export function addPairs(t1: Pair, t2: Pair): Pair {
  const root = new Pair();
  root.children.push(t1, t2);
  root.children.forEach(r => {
    r.parent = root;
  });
  return root;
}

export function reducePair(p: Pair): Pair {
  let nesting = 0;
  let par = p.parent;
  while (p.parent) {
    nesting++;
    par = par?.parent;
  }

  //explode
  for (let i = 0; i < p.children.length; i++) {
    const res = checkExplode(p.children[i], nesting + 1);
    if (res.exploded) {
      if (res.left) reducePair(res.left);
      if (res.right) reducePair(res.right);
    }
  }

  return p;

}


export function checkSplit(p: Pair) {
  return p;
}

export type ExplodeResult = {
  exploded: boolean;
  result: Pair;
  left: Pair | undefined;
  right: Pair | undefined;
}

export function checkExplode(p: Pair, nesting: number): ExplodeResult {
  console.log("checking", p.toString(), "nesting", nesting)
  if (p.isContainer() && nesting >= 4) {
    if (!p.children[0].isValue() || !p.children[1].isValue()) {
      throw Error("nested too deep!"); //not sure what to do here
    }
    console.log("found nested pair", p.toString());
    let left = undefined;
    const right = undefined;
    if (p.parent) {
      left = addLeft(p.parent, p.children[0].value);
    }
    return {
      exploded: true,
      result: <Pair>p.parent,
      left: left,
      right: right
    };
  } else if (p.isContainer()) {
    for (let i = 0; i < p.children.length; i++) {
      const r = checkExplode(p.children[i], nesting + 1);
      if (r.exploded) {
        return r;
      }
    }
  }
  return {
    exploded: false,
    result: p,
    left: undefined,
    right: undefined
  };
}

//todo traverse correctly
function addLeft(p: Pair, n: number): Pair | undefined {
  if (p.isValue()) {
    p.value += n;
    return p.parent;
  } else {
    const left = p.children[0];
    if (left) {
      return addLeft(<Pair>left, n);
    }
  }
  return undefined;
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



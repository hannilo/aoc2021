export const max = (a: number, b: number): number => (a > b ? a : b);
export const min = (a: number, b: number): number => (a > b ? b : a);

interface PriorityQueue<T> {
  insert(item: T, priority: number): void;

  peek(): T;

  pop(): T;

  size(): number;

  isEmpty(): boolean;
}

export class HeapPriorityQueue<T> implements PriorityQueue<T> {
  private heap: [number, T][] = [];
  private map: Map<T, number> = new Map<T, number>();

  left(index: number): number {
    return 2 * index + 1;
  }

  right(index: number): number {
    return 2 * index + 2;
  }

  parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  hasLeft(index: number): boolean {
    return this.left(index) < this.heap.length;
  }

  hasRight(index: number): boolean {
    return this.right(index) < this.heap.length;
  }


  swap(a: number, b: number) {
    const tmp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.map.set(this.heap[a][1], a);
    this.heap[b] = tmp;
    this.map.set(this.heap[b][1], b);
  }

  isEmpty(): boolean {
    return this.heap.length == 0;
  }

  peek(): T {
    return this.heap[0][1];
  }

  pop(): T {
    if (this.isEmpty()) {
      throw Error("empty heap");
    }
    this.swap(0, this.heap.length - 1);
    const first = <[number, T]>this.heap.pop();
    this.map.delete(first[1]);

    let c = 0;
    while (this.hasLeft(c)) {
      let lesser = this.left(c);
      if (this.hasRight(c) && this.heap[this.right(c)][0] < this.heap[this.left(c)][0]) {
        lesser = this.right(c);
      }
      if (this.heap[lesser][0] > this.heap[c][0]) {
        break;
      }
      this.swap(c, lesser);
      c = lesser;
    }
    return first[1];
  }

  insert(item: T, priority: number) {
    this.heap.push([priority, item]);
    let i = this.heap.length - 1;
    this.map.set(item, i);
    while (i > 0) {
      const p = this.parent(i);
      if (this.heap[p][0] < this.heap[i][0]) {
        break;
      }
      this.swap(i, p);
      i = p;
    }
  }

  size(): number {
    return this.heap.length;
  }

  has(item: T): boolean {
    return this.map.has(item);
  }

  decrease(item: T, sub: number) {
    let i = <number>this.map.get(item);
    this.heap[i][0] = this.heap[i][0] - sub;
    while (i > 0) {
      const p = this.parent(i);
      if (this.heap[i][0] < this.heap[p][0]) {
        this.swap(i, p);
        i = p;
      } else {
        break;
      }
    }
  }
}

export function gaussSum(n: number): number {
  return (n ** 2 + n) / 2;
}

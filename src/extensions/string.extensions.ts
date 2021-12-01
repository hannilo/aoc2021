interface String {
  splitLines(): string[];
}

String.prototype.splitLines = function (this: string): string[] {
  return this.split("\n").map(s => s.trim()).filter(s => s.length);
};

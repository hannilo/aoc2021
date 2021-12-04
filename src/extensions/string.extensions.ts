// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare interface String {
  splitLines(): string[];
}

String.prototype.splitLines = function (this: string): string[] {
  return this.split(RegExp("\\r?\\n")).map(s => s.trim()).filter(s => s.length);
};

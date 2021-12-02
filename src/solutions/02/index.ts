export const example =
  "forward 5\n" +
  "down 5\n" +
  "forward 8\n" +
  "up 3\n" +
  "down 8\n" +
  "forward 2";

export const LINE_REGEXP = new RegExp("(forward|down|up) (\\d)");

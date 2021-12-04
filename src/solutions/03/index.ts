export const example =
  "00100\n" +
  "11110\n" +
  "10110\n" +
  "10111\n" +
  "10101\n" +
  "01111\n" +
  "00111\n" +
  "11100\n" +
  "10000\n" +
  "11001\n" +
  "00010\n" +
  "01010";


export const mostCommonBits = (input: string[]): number[] => {
  const balance = Array(input[0].length).fill(0);
  input.forEach(l => {
    [...l].forEach((c, i) => {
      c == "1" ? balance[i] += 1 : balance[i] -= 1;
    });
  });
  return balance.map(n => {
    if (n == 0) {
      return -1
    } else {
      return n > 0 ? 1 : 0
    }
  });
};
export const solve = (input: string[]): number => {
  const arr = input.map(value => parseInt(value));
  let acc = 0;
  let oldsum = arr.slice(0, 3).reduce((p, c) => p + c);
  //could use map((_,i) => reduce(slice(i,i+3)))
  for (let i = 1; i < arr.length - 2; i++) {
    const newsum = arr.slice(i, i + 3).reduce((p, c) => p + c);
    if (newsum > oldsum) {
      acc += 1;
    }
    console.log(`${i} ${arr[i]} ${oldsum} ${newsum} ${acc}`)
    oldsum = newsum;
  }
  return acc;
};
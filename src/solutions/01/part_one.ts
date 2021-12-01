export const solve = (input: string[]): number => {
  const arr = input.map(value => parseInt(value));
  let acc = 0;
  console.log(`0 ${arr[0]} ${acc}`)
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      acc += 1;
    }
    console.log(`${i} ${arr[i]} ${acc}`)
  }
  return acc;
};
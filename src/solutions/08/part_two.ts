// 8 : abcdefg : 7
// 1 :   c  f  : 2
// 7 : a c  f  : 3
// 4 :  bcd f  : 4

// 4 :  bcd f  : 4
// 2 : A cde g : 5
// 3 : A cd fg : 5
// 5 : Ab d fg : 5
//      2 41
//      B DE


// 0 : abc efg : 6 < no D
// 9 : abcd fg : 6 < no E
// 6 : ab defg : 6


// 1 4  78
//take len4 + all len5, E freq=1, B freq=2, D freq=4
//take all len5, if has B then 5, if has E then 2, last one is 3
// 12345 78
//take all len6, missing D is 0, missing E is 9, last is 6
//0123456789
//then just sort each string and compare, or use mapping


import {parseLine} from "./index";

export function findFrequencies(input: string[]): Map<string, number> {
  const frequencies = new Map<string, number>();
  input.forEach(value => [...value].forEach(c => {
    const f = frequencies.get(c);
    if (f) {
      frequencies.set(c, f + 1);
    } else {
      frequencies.set(c, 1);
    }
  }));
  return frequencies;
}

//returns parsed number as a string (eg "abcd" > "3")
export function findLineMapping(input: string[]): Map<string, string> {
  const numberMapping = new Map<string, string>();
  numberMapping.set(<string>input.find(s => s.length == 2), "1");
  numberMapping.set(<string>input.find(s => s.length == 3), "7");
  numberMapping.set(<string>input.find(s => s.length == 4), "4");
  numberMapping.set(<string>input.find(s => s.length == 7), "8");

  const fourAndFiveLen = input.filter(s => s.length == 4 || s.length == 5);
  const fourAndFiveLenFreqs = findFrequencies(fourAndFiveLen);
  const E = [...fourAndFiveLenFreqs].filter(f => f[1] == 1)[0][0];
  const B = [...fourAndFiveLenFreqs].filter(f => f[1] == 2)[0][0];
  const D = [...fourAndFiveLenFreqs].filter(f => f[1] == 4)[0][0];

  const fiveLen = input.filter(s => s.length == 5);
  numberMapping.set(<string>fiveLen.find(s => s.indexOf(E) > -1), "2");
  numberMapping.set(<string>fiveLen.find(s => s.indexOf(B) > -1), "5");
  numberMapping.set(<string>fiveLen.find(s => !numberMapping.has(s)), "3");

  const sixLen = input.filter(s => s.length == 6);
  numberMapping.set(<string>sixLen.find(s => s.indexOf(D) == -1), "0");
  numberMapping.set(<string>sixLen.find(s => s.indexOf(E) == -1), "9");
  numberMapping.set(<string>sixLen.find(s => !numberMapping.has(s)), "6");

  return numberMapping;
}

export const solve = (input: string[]): number => {
  const parsed = input.map(parseLine);

  const numbers = parsed.map(r => {
    const rowMapping = findLineMapping(r[0]);
    const numbers = r[1].map(s => rowMapping.get(s));
    if (!numbers) {
      throw new Error("invalid mapping result");
    }
    return parseInt(numbers.join(""), 10);
  });


  return numbers.reduce((p, c) => p + c);
};
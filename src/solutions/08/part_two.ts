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
//then just sort each string and compare
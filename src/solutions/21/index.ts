interface Dice {
  roll(): number;

  rollN(n: number): number[];
}

export class DeterministicDice implements Dice {
  readonly faces: number;
  private _curr: number;

  constructor(faces: number) {
    this.faces = faces;
    this._curr = this.faces;
  }

  get curr(): number {
    return this._curr;
  }

  roll(): number {
    if (this._curr == this.faces) {
      this._curr = 0;
    }
    return ++this._curr;
  }

  rollN(n: number): number[] {
    return [...Array(n).keys()].map(() => this.roll());
  }
}


type RollResult = {
  next: number
  total: number
}

export function roll(start: number): RollResult {
  return {
    next: start + 3,
    total: start * 3 + 3
  };
}

type GameResult = {
  scores: [number, number]
  rolls: number
}

type GamePosition = {
  position: number
  score: number
}

function playRound(pos: GamePosition, dice: DeterministicDice): GamePosition {
  const sum = dice.rollN(3).reduce((p, c) => p + c);
  pos.position = (pos.position + sum) % 10;
  if (pos.position == 0) pos.position = 10;
  pos.score += pos.position;
  return pos;
}

export function play(p1: number, p2: number): GameResult {
  let pos1: GamePosition = {
    position: p1,
    score: 0
  };
  let pos2 = {
    position: p2,
    score: 0
  };
  let rolls = 0;
  const dice = new DeterministicDice(100);
  while (pos1.score < 1000 && pos2.score < 1000) {
    pos1 = playRound(pos1, dice);
    rolls += 3;
    if (pos1.score >= 1000) {
      break;
    }

    pos2 = playRound(pos2, dice);
    rolls += 3;
  }
  console.log("winner after", rolls, "rolls", pos1.score, pos2.score);
  return {
    scores: [pos1.score, pos2.score],
    rolls: rolls
  };
}

// pos:score|pos:score
function stringToPositions(s: string): [GamePosition, GamePosition] {
  const res = s.split("|").map(pos => {
    const t = pos.split(":");
    return {
      position: parseInt(t[0], 10),
      score: parseInt(t[1], 10)
    } as GamePosition;
  });
  return [res[0], res[1]];
}

function positionsToString(pos: [GamePosition, GamePosition]): string {
  return `${pos[0].position}:${pos[0].score}|${pos[1].position}:${pos[1].score}`;
}


const possibleRolls: number[] = [
  0, 0, 0,
  1, 3, 6, 7, 6, 3, 1
];


function playUniverse(pos: [GamePosition, GamePosition]): [GamePosition, GamePosition][] {
  const next: [GamePosition, GamePosition][] = [];
  const p1: GamePosition[] = [];
  const p2: GamePosition[] = [];

  for (let i = 3; i <= 9; i++) {
    let p1next = (pos[0].position + i) % 10;
    if (p1next == 0) p1next = 10;
    p1.push(
      ...Array(possibleRolls[i]).fill({score: pos[0].score + p1next, position: p1next} as GamePosition)
    );

    let p2next = (pos[1].position + i) % 10;
    if (p2next == 0) p2next = 10;
    p2.push(
      ...Array(possibleRolls[i]).fill({score: pos[1].score + p2next, position: p2next} as GamePosition)
    );
  }

  p1.forEach(i => {
    if (i.score >= 21) {
      // p1 won, end of universe, use p2 initial position for this final round
      next.push([i, pos[1]]);
    } else {
      p2.forEach(j => {
        next.push([i, j]);
      });
    }
  });
  return next;
}

export function playDirac(p1: number, p2: number): number[] {
  const wins = [0, 0];

  let universes: Map<string, number> = new Map<string, number>();
  const init1 = `${p1}:0`;
  const init2 = `${p2}:0`;
  universes.set(init1 + "|" + init2, 1);
  while (universes.size > 0) {
    const nextRoundUniverses: Map<string, number> = new Map<string, number>();
    [...universes.keys()].forEach(k => {
      const pos = stringToPositions(k);
      const count = <number>universes.get(k);
      universes.delete(k);
      const next = playUniverse(pos);
      next.forEach(n => {
        const nextKey = positionsToString(n);
        if (n[0].score >= 21 || n[1].score >= 21) {
          if (n[0].score > n[1].score) {
            wins[0] += count;
          } else {
            wins[1] += count;
          }
        } else {
          if (nextRoundUniverses.has(nextKey)) {
            nextRoundUniverses.set(nextKey, <number>nextRoundUniverses.get(nextKey) + count);
          } else {
            nextRoundUniverses.set(nextKey, count);
          }
        }
      });
    });
    universes = nextRoundUniverses;
  }

  return wins;
}

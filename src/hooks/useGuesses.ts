import { KeyboardEventHandler, MouseEventHandler, useCallback, useState } from "react";
import words from '../words';
import { LetterState } from "../Components/enums";
import useDailyWord from "./useDailyWord";

export enum Character {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  J = "J",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  Q = "Q",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  V = "V",
  W = "W",
  X = "X",
  Y = "Y",
  Z = "Z",
}

export type GuessData = { letter: Character | "", state: LetterState }

export type GuessDataRow = [
  GuessData,
  GuessData,
  GuessData,
  GuessData,
  GuessData,
];

export type GuessesMatrix = [
  GuessDataRow,
  GuessDataRow,
  GuessDataRow,
  GuessDataRow,
  GuessDataRow,
  GuessDataRow,
];


const defaultMatrix: GuessesMatrix = [
  [
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
  ],
  [
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
  ],
  [
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
  ],
  [
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
  ],
  [
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
  ],
  [
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
    { letter: "", state: LetterState.EMPTY },
  ],
]

const checkLetterPositions = (row: GuessDataRow, ref: string) => {
  const lettersLeftToCheck = new Map<string, number>();

  for (let i = 0; i < row.length; i++) {
    const currentCount = lettersLeftToCheck.get(ref[i]) || 0;
    lettersLeftToCheck.set(ref[i], currentCount + 1);
  }

  for (let i = 0; i < row.length; i++) {
    if (row[i].letter === ref[i]) {
      const currentCount = lettersLeftToCheck.get(row[i].letter) || 0;

      if (currentCount) {
        row[i].state = LetterState.PRESENT;
        lettersLeftToCheck.set(row[i].letter, currentCount - 1);
      }
    }
  }

  for (let i = 0; i < row.length; i++) {
    if (row[i].state !== LetterState.PRESENT && ref.includes(row[i].letter)) {
      const currentCount = lettersLeftToCheck.get(row[i].letter) || 0;

      if (currentCount) {
        row[i].state = LetterState.MISPLACED;
        lettersLeftToCheck.set(row[i].letter, currentCount - 1);
      }
    }
  }

  for (let i = 0; i < row.length; i++) {
    if (row[i].state !== LetterState.PRESENT && row[i].state !== LetterState.MISPLACED) {
      row[i].state = LetterState.ABSENT;
    }
  }

  return row;
}

const useGuesses = () => {
  const dailyWord = useDailyWord();
  const [matrix, setMatrix] = useState<GuessesMatrix>(defaultMatrix);
  const [row, setRow] = useState(0);

  const updateMatrix = useCallback((key: Character | "↵" | "←") => {
    const currentGuess = matrix[row].map(({ letter }) => letter).join('');
    switch (key) {
      case "←": {
        if (currentGuess.length === 0) return;
        setMatrix(old => {
          old[row][currentGuess.length - 1] = { letter: "", state: LetterState.EMPTY };
          return JSON.parse(JSON.stringify(old));
        });
        break;
      }
      case "↵": {
        if (currentGuess.length !== 5 || !words.includes(currentGuess)) return;
        setMatrix((old) => {
          old[row] = checkLetterPositions(matrix[row], dailyWord);
          return JSON.parse(JSON.stringify(old));
        })
        setRow(row + 1);
        break;
      }
      default: {
        if (currentGuess.length === 5) return;
        setMatrix(old => {
          old[row][currentGuess.length] = { letter: key, state: LetterState.EMPTY };
          return JSON.parse(JSON.stringify(old));
        });
        break;
      }
    }
  }, [setMatrix, matrix, row])

  const kbEventHandler = useCallback<KeyboardEventHandler<HTMLDivElement>>((e) => {
    if (e.key === "Enter") {
      updateMatrix("↵");
      return;
    };
    if (e.key === "Backspace") {
      updateMatrix("←");
      return;
    }

    const key = e.key.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    if (key in Character) updateMatrix(key as Character);
  }, [updateMatrix]);

  const mouseEventHandler = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    updateMatrix(e.currentTarget.dataset.key as Character)
  }, [updateMatrix]);

  return {
    matrix,
    kbEventHandler,
    mouseEventHandler,
  }
}

export default useGuesses;
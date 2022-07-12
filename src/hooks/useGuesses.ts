import { KeyboardEventHandler, MouseEventHandler, useCallback, useState } from "react";
import words from '../words';
import { LetterState, GuessesMatrix, InputCharacter, BaseCharacter } from "../types";
import useDailyWord from "./useDailyWord";
import { checkLetterPositions } from "../utils";

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
];

const useGuesses = () => {
  const dailyWord = useDailyWord();
  const [matrix, setMatrix] = useState<GuessesMatrix>(defaultMatrix);
  const [row, setRow] = useState(0);

  const updateMatrix = useCallback((key: InputCharacter) => {
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
    if (key in BaseCharacter) updateMatrix(key as BaseCharacter);
  }, [updateMatrix]);

  const mouseEventHandler = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    updateMatrix(e.currentTarget.dataset.key as BaseCharacter)
  }, [updateMatrix]);

  return {
    matrix,
    kbEventHandler,
    mouseEventHandler,
  }
}

export default useGuesses;
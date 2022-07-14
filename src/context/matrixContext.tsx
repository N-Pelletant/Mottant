import { createContext, Dispatch, ReactNode, Reducer, useEffect, useReducer } from "react";
import useDailyWord from "../hooks/useDailyWord";
import { GuessesMatrix, InputCharacter, LetterState } from "../types";
import { checkLetterPositions } from "../utils";
import words from "../words";

type State = {
  row: number,
  matrix: GuessesMatrix,
  word: string,
}

type Value = {
  matrix: GuessesMatrix,
  matrixDispatcher: Dispatch<InputCharacter>,
}

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

const MatrixReducer: Reducer<State, InputCharacter> = ({ row, matrix, word }, action) => {
  const newMatrix: GuessesMatrix = JSON.parse(JSON.stringify(matrix));
  const currentLine = newMatrix[row].map(el => el.letter).join('');

  switch (action) {
    case "←": {
      if (currentLine.length !== 0) {
        newMatrix[row][currentLine.length - 1].letter = "";
      }
      break;
    }
    case "↵": {
      if (currentLine.length === 5 && words.includes(currentLine)) {
        newMatrix[row] = checkLetterPositions(matrix[row], word);
        row++;
      }
      break;
    }
    default: {
      if (currentLine.length !== 5)
        newMatrix[row][currentLine.length].letter = action;
    }
  }
  
  return {
    row,
    matrix: newMatrix,
    word
  }
}

const MatrixReducerInit = (word: string) => {
  return {
    row: 0,
    matrix: defaultMatrix,
    word: word
  }
}

export const MatrixContext = createContext<Value>({
  matrix: defaultMatrix,
  matrixDispatcher: () => { },
});

export const MatrixProvider = ({ children }: { children: ReactNode }) => {
  const dailyWord = useDailyWord();
  const [{ matrix }, matrixDispatcher] = useReducer<
    Reducer<State, InputCharacter>,
    string
  >(MatrixReducer, dailyWord, MatrixReducerInit)

  return (
    <MatrixContext.Provider value={{
      matrix,
      matrixDispatcher
    }}>
      {children}
    </MatrixContext.Provider>
  )
}
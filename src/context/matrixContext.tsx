import { createContext, Dispatch, ReactNode, Reducer, useReducer } from "react";
import useDailyWord from "../hooks/useDailyWord";
import { GuessesMatrix, GuessState, InputCharacter, LetterState } from "../types";
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
  {
    state: GuessState.WRITING,
    guess: [
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
    ]
  },
  {
    state: GuessState.WRITING,
    guess: [
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
    ]
  },
  {
    state: GuessState.WRITING,
    guess: [
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
    ]
  },
  {
    state: GuessState.WRITING,
    guess: [
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
    ]
  },
  {
    state: GuessState.WRITING,
    guess: [
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
    ]
  },
  {
    state: GuessState.WRITING,
    guess: [
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
      { letter: "", state: LetterState.EMPTY },
    ]
  },
];

const MatrixReducer: Reducer<State, InputCharacter> = ({ row, matrix, word }, action) => {
  const newMatrix: GuessesMatrix = JSON.parse(JSON.stringify(matrix));
  const currentLine = newMatrix[row].guess.map(el => el.letter).join('');

  switch (action) {
    case "←": {
      if (currentLine.length !== 0) {
        newMatrix[row].guess[currentLine.length - 1].letter = "";
        newMatrix[row].state = GuessState.WRITING;
      }
      break;
    }
    case "↵": {
      if (currentLine.length !== 5) break;

      if (!words.includes(currentLine)) {
        newMatrix[row].state = GuessState.ERROR
        break;
      }
      
      if (words.includes(currentLine)) {
        newMatrix[row] = checkLetterPositions(matrix[row], word);
        row++;
      }
      break;
    }
    default: {
      if (currentLine.length !== 5)
        newMatrix[row].guess[currentLine.length].letter = action;
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
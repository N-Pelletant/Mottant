import { BaseCharacter, GuessesMatrix, LetterState } from "../types";

export const getLetterState = (matrix: GuessesMatrix, key: BaseCharacter) => {
  let state = LetterState.UNKNOWN;

  for (const row of matrix) {
    for (const element of row) {
      if (element.letter !== key) 
        continue;

      if (element.state === LetterState.PRESENT) 
        return LetterState.PRESENT;

      if (element.state === LetterState.MISPLACED) 
        state = LetterState.MISPLACED;

      if (element.state === LetterState.ABSENT && state !== LetterState.MISPLACED)
        state = LetterState.ABSENT;
    }
  }

  return state;
}
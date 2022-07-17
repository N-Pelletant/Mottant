import { GuessRow, GuessState, LetterState } from "../types";

export const checkLetterPositions = ({ guess }: GuessRow, ref: string) => {
  const lettersLeftToCheck = new Map<string, number>();

  for (let i = 0; i < guess.length; i++) {
    const currentCount = lettersLeftToCheck.get(ref[i]) || 0;
    lettersLeftToCheck.set(ref[i], currentCount + 1);
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i].letter === ref[i]) {
      const currentCount = lettersLeftToCheck.get(guess[i].letter) || 0;

      if (currentCount) {
        guess[i].state = LetterState.PRESENT;
        lettersLeftToCheck.set(guess[i].letter, currentCount - 1);
      }
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i].state !== LetterState.PRESENT && ref.includes(guess[i].letter)) {
      const currentCount = lettersLeftToCheck.get(guess[i].letter) || 0;

      if (currentCount) {
        guess[i].state = LetterState.MISPLACED;
        lettersLeftToCheck.set(guess[i].letter, currentCount - 1);
      }
    }
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i].state !== LetterState.PRESENT && guess[i].state !== LetterState.MISPLACED) {
      guess[i].state = LetterState.ABSENT;
    }
  }

  const newState = guess.every(({ state }) => state === LetterState.PRESENT) ? GuessState.COMPLETE : GuessState.INCOMPLETE;

  return {
    guess,
    state: newState
  };
}
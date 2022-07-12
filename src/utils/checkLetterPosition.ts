import { GuessDataRow, LetterState } from "../types";

export const checkLetterPositions = (row: GuessDataRow, ref: string) => {
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
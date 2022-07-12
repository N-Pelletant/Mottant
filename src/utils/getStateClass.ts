import { LetterState } from "../types";

export const getStateClass = (state: LetterState) => {
  switch (state) {
    case LetterState.EMPTY: return "empty";
    case LetterState.UNKNOWN: return "unknown";
    case LetterState.ABSENT: return "absent";
    case LetterState.MISPLACED: return "misplaced";
    case LetterState.PRESENT: return "present";
    default: return '';
  } 
}
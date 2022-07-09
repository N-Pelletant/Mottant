import classes from './common.module.css';
import { LetterState } from "./enums";

export const getStateClass = (state: LetterState) => {
  switch (state) {
    case LetterState.ABSENT: return classes.absent;
    case LetterState.MISPLACED: return classes.misplaced;
    case LetterState.PRESENT: return classes.present;
    case LetterState.UNKNOWN: return classes.unknown;
    case LetterState.EMPTY: return classes.empty;
    default: return '';
  } 
}
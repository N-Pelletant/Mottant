import { BaseCharacter, LetterState } from "./enum";

export type GuessData = { letter: BaseCharacter | "", state: LetterState }

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

export type InputCharacter = BaseCharacter | "↵" | "←";
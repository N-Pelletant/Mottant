import { BaseCharacter, GuessState, LetterState } from "./enum";

export type GuessData = { letter: BaseCharacter | "", state: LetterState }

export type GuessRow = {
  state: GuessState,
  guess: [
    GuessData,
    GuessData,
    GuessData,
    GuessData,
    GuessData,
  ]
};

export type GuessesMatrix = [
  GuessRow,
  GuessRow,
  GuessRow,
  GuessRow,
  GuessRow,
  GuessRow,
];

export type InputCharacter = BaseCharacter | "↵" | "←";
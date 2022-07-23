import { useCallback, useEffect, useRef } from "react";
import classes from './Game.module.css';
import { Guesses, Keyboard } from "../../Components"
import { useGuesses } from "../../hooks";
import { BaseCharacter } from "../../types";
import { getLetterState } from "../../utils";

const Game = () => {
  const { matrix, kbEventHandler, mouseEventHandler } = useGuesses();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => ref.current?.focus(), [ref]);

  const checkLetterState = useCallback(
    (key: BaseCharacter) => getLetterState(matrix, key), 
    [matrix]
  );

  return (
    <div
      className={classes.game}
      tabIndex={0}
      onKeyDown={kbEventHandler}
      ref={ref}
    >
      <Guesses matrix={matrix} />
      <Keyboard checkLetterState={checkLetterState} onClick={mouseEventHandler} />
    </div>
  );
}

export default Game;
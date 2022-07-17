import { KeyboardEventHandler, MouseEventHandler, useCallback, useContext } from "react";
import { BaseCharacter } from "../types";
import { MatrixContext } from "../context";

const useGuesses = () => {
  const { matrix, matrixDispatcher } = useContext(MatrixContext);

  const kbEventHandler = useCallback<KeyboardEventHandler<HTMLDivElement>>((e) => {
    if (e.key === "Enter") {
      matrixDispatcher("↵");
      return;
    };
    if (e.key === "Backspace") {
      matrixDispatcher("←");
      return;
    }

    const key = e.key.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    if (key in BaseCharacter) matrixDispatcher(key as BaseCharacter);
  }, [matrixDispatcher]);

  const mouseEventHandler = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    matrixDispatcher(e.currentTarget.dataset.key as BaseCharacter)
  }, [matrixDispatcher]);

  return {
    matrix,
    kbEventHandler,
    mouseEventHandler,
  }
}

export default useGuesses;
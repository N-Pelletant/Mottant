import { Guesses, Header, Keyboard } from './Components'
import classes from './App.module.css'
import { useGuesses } from './hooks'
import { useCallback } from 'react';
import { LetterState } from './Components/enums';

const App = () => {
  const { matrix, kbEventHandler, mouseEventHandler } = useGuesses();

  const checkLetterState = useCallback((key: string) => {
    let state = LetterState.UNKNOWN;

    for (const row of matrix) {
      const occurence = row.find(el => el.letter === key);

      if (
        occurence?.state === LetterState.PRESENT
      ) {
        state = LetterState.PRESENT;
      }

      if (
        occurence?.state === LetterState.MISPLACED && 
        state !== LetterState.PRESENT 
      ) {
        state = LetterState.MISPLACED;
      }

      if (
        occurence?.state === LetterState.ABSENT &&
        state !== LetterState.PRESENT &&
        state !== LetterState.MISPLACED
      ) {
        state = LetterState.ABSENT;
      }
    }

    return state;
  }, [matrix]);
  
  return (
    <div 
      className={classes.app}
      tabIndex={0}
      onKeyDown={kbEventHandler}
    >
      <Header />
      <Guesses matrix={matrix} />
			<Keyboard checkLetterState={checkLetterState} onClick={mouseEventHandler} />
      {/* 
      <Informations />
      <Statistics />
      <Settings /> 
      */}
    </div>
  )
}

export default App

import cn from 'classnames';
import { GuessesMatrix, GuessState } from "../../types";
import { Letter } from "../Letter";
import classes from './Guesses.module.css';

type GuessesProps = {
	matrix: GuessesMatrix;
}

const Guesses = ({ matrix }: GuessesProps) => {
	return (
		<div className={classes.guesses}>
			{matrix.map(
				({ guess, state }, i1) => (
					<div
						key={i1}
						className={
							cn(
								classes.guess,
								{ [classes.shake]: state === GuessState.ERROR }
							)
						}
					>
						{guess.map(
							({ letter, state }, i2) => (
								<Letter
									key={`${i1}_${i2}`}
									data-index={i2}
									data-letter={letter || undefined}
									state={state}
								>
									{letter}
								</Letter>
							)
						)}
					</div>
				)
			)}
		</div>
	);
}

export default Guesses;
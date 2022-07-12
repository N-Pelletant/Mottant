import { GuessesMatrix } from "../../types";
import { Letter } from "../Letter";
import classes from './Guesses.module.css';

type GuessesProps = {
	matrix: GuessesMatrix;
}

const Guesses = ({ matrix }: GuessesProps) => {
	return (
		<div className={classes.guesses}>
			{
				matrix.map(
					(row, i1) => (
						row.map(
							({ letter, state }, i2) => (
								<Letter 
									key={`${i1}_${i2}`}
									data-index={i2}
									state={state}
								>
									{letter}
								</Letter>
							)
						)
					)
				)
			}
		</div>
	);
}

export default Guesses;
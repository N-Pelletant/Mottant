import { MouseEventHandler } from 'react';
import { Key } from '../Key';
import classes from './Keyboard.module.css';
import { FiDelete } from 'react-icons/fi'
import { BaseCharacter, LetterState } from '../../types';

type KeyboardProps = {
	onClick: MouseEventHandler<HTMLButtonElement>;
	checkLetterState: (key: BaseCharacter) => LetterState;
}

const Keyboard = ({ onClick, checkLetterState }: KeyboardProps) => {
	return (
		<div className={classes.keyboard}>
			<div className={classes.keyboardRow}>
				<Key onClick={onClick} datakey={BaseCharacter.A} state={checkLetterState(BaseCharacter.A)} >A</Key>
				<Key onClick={onClick} datakey={BaseCharacter.Z} state={checkLetterState(BaseCharacter.Z)} >Z</Key>
				<Key onClick={onClick} datakey={BaseCharacter.E} state={checkLetterState(BaseCharacter.E)} >E</Key>
				<Key onClick={onClick} datakey={BaseCharacter.R} state={checkLetterState(BaseCharacter.R)} >R</Key>
				<Key onClick={onClick} datakey={BaseCharacter.T} state={checkLetterState(BaseCharacter.T)} >T</Key>
				<Key onClick={onClick} datakey={BaseCharacter.Y} state={checkLetterState(BaseCharacter.Y)} >Y</Key>
				<Key onClick={onClick} datakey={BaseCharacter.U} state={checkLetterState(BaseCharacter.U)} >U</Key>
				<Key onClick={onClick} datakey={BaseCharacter.I} state={checkLetterState(BaseCharacter.I)} >I</Key>
				<Key onClick={onClick} datakey={BaseCharacter.O} state={checkLetterState(BaseCharacter.O)} >O</Key>
				<Key onClick={onClick} datakey={BaseCharacter.P} state={checkLetterState(BaseCharacter.P)} >P</Key>
			</div>
			<div className={classes.keyboardRow}>
				<Key onClick={onClick} datakey={BaseCharacter.Q} state={checkLetterState(BaseCharacter.Q)} >Q</Key>
				<Key onClick={onClick} datakey={BaseCharacter.S} state={checkLetterState(BaseCharacter.S)} >S</Key>
				<Key onClick={onClick} datakey={BaseCharacter.D} state={checkLetterState(BaseCharacter.D)} >D</Key>
				<Key onClick={onClick} datakey={BaseCharacter.F} state={checkLetterState(BaseCharacter.F)} >F</Key>
				<Key onClick={onClick} datakey={BaseCharacter.G} state={checkLetterState(BaseCharacter.G)} >G</Key>
				<Key onClick={onClick} datakey={BaseCharacter.H} state={checkLetterState(BaseCharacter.H)} >H</Key>
				<Key onClick={onClick} datakey={BaseCharacter.J} state={checkLetterState(BaseCharacter.J)} >J</Key>
				<Key onClick={onClick} datakey={BaseCharacter.K} state={checkLetterState(BaseCharacter.K)} >K</Key>
				<Key onClick={onClick} datakey={BaseCharacter.L} state={checkLetterState(BaseCharacter.L)} >L</Key>
				<Key onClick={onClick} datakey={BaseCharacter.M} state={checkLetterState(BaseCharacter.M)} >M</Key>
			</div>
			<div className={classes.keyboardRow}>
				<Key onClick={onClick} datakey={"↵"} >ENTER</Key>
				<Key onClick={onClick} datakey={BaseCharacter.W} state={checkLetterState(BaseCharacter.W)} >W</Key>
				<Key onClick={onClick} datakey={BaseCharacter.X} state={checkLetterState(BaseCharacter.X)} >X</Key>
				<Key onClick={onClick} datakey={BaseCharacter.C} state={checkLetterState(BaseCharacter.C)} >C</Key>
				<Key onClick={onClick} datakey={BaseCharacter.V} state={checkLetterState(BaseCharacter.V)} >V</Key>
				<Key onClick={onClick} datakey={BaseCharacter.B} state={checkLetterState(BaseCharacter.B)} >B</Key>
				<Key onClick={onClick} datakey={BaseCharacter.N} state={checkLetterState(BaseCharacter.N)} >N</Key>
				<Key onClick={onClick} datakey={"←"} ><FiDelete /></Key>
			</div>
		</div>
	);
}

export default Keyboard;
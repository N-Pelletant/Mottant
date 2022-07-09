import { MouseEventHandler } from 'react';
import { Key } from '../Key';
import classes from './Keyboard.module.css';
import { FiDelete } from 'react-icons/fi'
import { LetterState } from '../enums';

type KeyboardProps = {
	onClick: MouseEventHandler<HTMLButtonElement>;
	checkLetterState: (key: string) => LetterState;
}

const Keyboard = ({ onClick, checkLetterState }: KeyboardProps) => {
	return (
		<div className={classes.keyboard}>
			<div className={classes.keyboardRow}>
				<Key onClick={onClick} datakey="A" state={checkLetterState("A")} >A</Key>
				<Key onClick={onClick} datakey="Z" state={checkLetterState("Z")} >Z</Key>
				<Key onClick={onClick} datakey="E" state={checkLetterState("E")} >E</Key>
				<Key onClick={onClick} datakey="R" state={checkLetterState("R")} >R</Key>
				<Key onClick={onClick} datakey="T" state={checkLetterState("T")} >T</Key>
				<Key onClick={onClick} datakey="Y" state={checkLetterState("Y")} >Y</Key>
				<Key onClick={onClick} datakey="U" state={checkLetterState("U")} >U</Key>
				<Key onClick={onClick} datakey="I" state={checkLetterState("I")} >I</Key>
				<Key onClick={onClick} datakey="O" state={checkLetterState("O")} >O</Key>
				<Key onClick={onClick} datakey="P" state={checkLetterState("P")} >P</Key>
			</div>
			<div className={classes.keyboardRow}>
				<Key onClick={onClick} datakey="Q" state={checkLetterState("Q")} >Q</Key>
				<Key onClick={onClick} datakey="S" state={checkLetterState("S")} >S</Key>
				<Key onClick={onClick} datakey="D" state={checkLetterState("D")} >D</Key>
				<Key onClick={onClick} datakey="F" state={checkLetterState("F")} >F</Key>
				<Key onClick={onClick} datakey="G" state={checkLetterState("G")} >G</Key>
				<Key onClick={onClick} datakey="H" state={checkLetterState("H")} >H</Key>
				<Key onClick={onClick} datakey="J" state={checkLetterState("J")} >J</Key>
				<Key onClick={onClick} datakey="K" state={checkLetterState("K")} >K</Key>
				<Key onClick={onClick} datakey="L" state={checkLetterState("L")} >L</Key>
				<Key onClick={onClick} datakey="M" state={checkLetterState("M")} >M</Key>
			</div>
			<div className={classes.keyboardRow}>
				<Key onClick={onClick} datakey="↵" >ENTER</Key>
				<Key onClick={onClick} datakey="W" state={checkLetterState("W")} >W</Key>
				<Key onClick={onClick} datakey="X" state={checkLetterState("X")} >X</Key>
				<Key onClick={onClick} datakey="C" state={checkLetterState("C")} >C</Key>
				<Key onClick={onClick} datakey="V" state={checkLetterState("V")} >V</Key>
				<Key onClick={onClick} datakey="B" state={checkLetterState("B")} >B</Key>
				<Key onClick={onClick} datakey="N" state={checkLetterState("N")} >N</Key>
				<Key onClick={onClick} datakey="←" ><FiDelete /></Key>
			</div>
		</div>
	);
}

export default Keyboard;
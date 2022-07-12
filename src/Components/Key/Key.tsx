import { MouseEventHandler, ReactNode } from "react";
import cn from 'classnames';
import classes from './Key.module.css';
import { LetterState } from '../../types';
import { getStateClass } from "../../utils";

export type KeyProps = {
	className?: string;
	state?: LetterState;
	datakey: string;
	children: ReactNode;
	onClick: MouseEventHandler<HTMLButtonElement>;
}

const Key = ({
	state = LetterState.UNKNOWN,
	datakey,
	children,
	className = '',
	onClick,
}: KeyProps) => {
	return (
		<button
			className={
				cn(
					className,
					classes.key,
					getStateClass(state),
				)
			}
			onClick={onClick}
			data-key={datakey}
		>
			{children}
		</button>
	);
}

export default Key;
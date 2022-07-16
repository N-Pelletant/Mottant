import cn from 'classnames';
import { HTMLProps } from "react";
import classes from './Letter.module.css';
import { getStateClass } from "../../utils";
import { LetterState } from "../../types";

export type LetterProps = {
  state?: LetterState;
  children?: string;
} & HTMLProps<HTMLDivElement>

const Letter = ({
  children,
  state = LetterState.EMPTY,
  ...props
}: LetterProps) => {
  return (
    <div
      className={
        cn(
          classes.letter,
          { 
            [classes.popin]: state === LetterState.EMPTY && !!children,
            [classes.flip]: state !== LetterState.EMPTY,
          },
          getStateClass(state),
        )
      }
      {...props}
    />
  );
}

export default Letter;
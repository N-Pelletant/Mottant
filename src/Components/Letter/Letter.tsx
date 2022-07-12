import { HTMLProps, ReactNode } from "react";
import cn from 'classnames';
import classes from './Letter.module.css';
import { getStateClass } from "../../utils";
import { LetterState } from "../../types";

export type LetterProps = {
  state?: LetterState;
  children?: ReactNode;
} & HTMLProps<HTMLDivElement>

const Letter = ({
  children,
  state = children ? LetterState.UNKNOWN : LetterState.EMPTY,
  ...props
}: LetterProps) => {
  return (
    <div
      className={
        cn(
          classes.letter,
          getStateClass(state),
        )
      }
      {...props}
    >
      {children}
    </div>
  );
}

export default Letter;
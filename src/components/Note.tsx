import React from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as PaperIcon } from "../assets/images/paper.svg";
import { ITodo } from "../interfaces/ITodo";
import { deleteTodo } from "../store/TodosSlice";

import { Checkbox } from "./Checkbox";
import { CloseButton } from "./CloseButton";

import classes from "./Note.module.scss";

interface INoteProps extends ITodo {
  onClickHandle: (id: string) => void;
}

export const Note: React.FunctionComponent<INoteProps> = ({
  id,
  name,
  status,
  onClickHandle,
}) => {
  const dispatch = useDispatch();
  return (
    <CSSTransition
      in={true}
      timeout={200}
      classNames="popup"
      mountOnEnter
      unmountOnExit
    >
      <section className={classes.note}>
        {/* <Draggable handle="#note__header"> */}
        <div id={classes["note__header"]}>
          <CloseButton onClickHandle={() => dispatch(deleteTodo(id))} />
        </div>
        {/* <div className={classes.header} /> */}
        <p>{name}</p>
        <Checkbox />
        {/* </Draggable> */}
      </section>
    </CSSTransition>
  );
};

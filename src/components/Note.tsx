import React, { useCallback } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import { ETodoStatus, ITodo } from "../interfaces/ITodo";
import { changeStatus, deleteTodo, setSelectedTodo } from "../store/TodosSlice";
import { EMessageboxResult, showMessageBox } from "../store/uiSlice";

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
  color,
  onClickHandle,
}) => {
  const dispatch = useDispatch();

  const statusChangedHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeStatus({
          id,
          newStatus: e.currentTarget.checked
            ? ETodoStatus.done
            : ETodoStatus.notDone,
        })
      );
    },
    [dispatch, id]
  );

  const deleteItemHandle = useCallback(() => {
    dispatch(setSelectedTodo({ id, name, status, color }));
    dispatch(
      showMessageBox({
        hasCancelButton: true,
        hasCloseButton: false,
        hasOkButton: true,
        message: `Are you sure for deleting '${name}' ?`,
        title: "Deleting Note!",
        visible: true,
        result: EMessageboxResult.CANCEL,
      })
    );
  }, [dispatch, name]);

  return (
    <CSSTransition
      in={true}
      timeout={200}
      classNames="popup"
      mountOnEnter
      unmountOnExit
    >
      <section
        className={classes.note}
        style={{ background: color || "var(--bgc)" }}
      >
        {/* <Draggable handle="#note__header"> */}
        <div
          id={classes["note__header"]}
          style={{ backgroundColor: color || "var(--bgc)" }}
        >
          <Checkbox
            onChangeHandle={statusChangedHandler}
            checked={status === ETodoStatus.done ? true : false}
          />
          <CloseButton onClickHandle={deleteItemHandle} />
        </div>
        <p className={`${status === ETodoStatus.done ? classes.done : null}`}>
          {name}
        </p>
        {/* </Draggable> */}
      </section>
    </CSSTransition>
  );
};

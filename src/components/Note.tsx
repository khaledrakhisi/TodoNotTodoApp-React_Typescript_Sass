import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { ETodoStatus, ITodo } from "../interfaces/ITodo";
import { changeStatus, setSelectedTodo } from "../store/TodosSlice";
import { EMessageboxResult, showMessageBox } from "../store/uiSlice";

import { Checkbox } from "./Checkbox";
import { CloseButton } from "./CloseButton";

import classes from "./Note.module.scss";

interface INoteProps {
  todo: ITodo;
  onClickHandle: (id: string) => void;
}

export const Note: React.FunctionComponent<INoteProps> = ({
  todo,
  onClickHandle,
}) => {
  const dispatch = useDispatch();

  const statusChangedHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeStatus({
          id: todo.id,
          newStatus: e.currentTarget.checked
            ? ETodoStatus.done
            : ETodoStatus.notDone,
        })
      );
    },
    [dispatch, todo]
  );

  const deleteItemHandle = useCallback(() => {
    dispatch(setSelectedTodo(todo));
    dispatch(
      showMessageBox({
        hasCancelButton: true,
        hasCloseButton: false,
        hasOkButton: true,
        message: `Are you sure for deleting '${todo.name}' ?`,
        title: "Deleting Note!",
        visible: true,
        result: EMessageboxResult.CANCEL,
      })
    );
  }, [dispatch, todo]);

  return (
    <section
      className={classes.note}
      style={{ background: todo.color || "var(--bgc)" }}
    >
      <div
        id={classes["note__header"]}
        style={{ backgroundColor: todo.color || "var(--bgc)" }}
      >
        <Checkbox
          onChangeHandle={statusChangedHandler}
          checked={todo.status === ETodoStatus.done ? true : false}
        />
        <CloseButton onClickHandle={deleteItemHandle} />
      </div>
      <p
        className={`${todo.status === ETodoStatus.done ? classes.done : null}`}
      >
        {todo.name}
      </p>
    </section>
  );
};

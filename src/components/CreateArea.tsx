import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "../store/store";
import { addTodo } from "../store/TodosSlice";
import {
  getTodoRandomName,
  selectCreateAreaExpandStatus,
  selectInputs,
  setCreateAreaExpandState,
  setInput,
} from "../store/uiSlice";

import LoadingSpinner from "./LoadingSpinner";

import classes from "./CreateArea.module.scss";

export const CreateArea = () => {
  const isCreateAreaExpanded = useSelector(selectCreateAreaExpandStatus);
  const { todoTitle, isLoading } = useSelector(selectInputs);
  const dispatch = useDispatch<AppDispatch>();

  const inputChangeHandle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setInput({
          name: "todoTitle",
          value: event.currentTarget.value,
        })
      );
    },
    [dispatch]
  );

  const formSubmitHandle = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      dispatch(addTodo(todoTitle));

      // clearing controls for next use
      dispatch(
        setInput({
          name: "todoTitle",
          value: "",
        })
      );

      // Get the next random title
      dispatch(getTodoRandomName());
    },
    [dispatch, todoTitle]
  );

  const randomTitleButtonCLickHandler = useCallback(() => {
    dispatch(getTodoRandomName());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTodoRandomName());
  }, [dispatch]);

  return (
    <form
      className={`${classes.createNote} ${
        isCreateAreaExpanded && classes.createNote__expanded
      }`}
      onSubmit={formSubmitHandle}
      data-testid="createarea"
    >
      {isLoading && <LoadingSpinner asOverlay />}

      <input
        name="todoTitle"
        type="text"
        value={todoTitle}
        placeholder={"Enter title here"}
        onChange={inputChangeHandle}
        onClick={() => dispatch(setCreateAreaExpandState(true))}
      />

      <button
        id="guessTitle"
        type="button"
        onClick={randomTitleButtonCLickHandler}
        className={`${isCreateAreaExpanded && classes.expanded}`}
      >
        ?
      </button>
      <button id="addTodo" type="submit" disabled={todoTitle ? false : true}>
        +
      </button>
    </form>
  );
};

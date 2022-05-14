import React from "react";
import { useSelector } from "react-redux";

import { CreateArea } from "../components/CreateArea";
import { Note } from "../components/Note";
import TextureBG from "../components/TextureBG";
import { selectTodos } from "../store/TodosSlice";
import { selectInputs } from "../store/uiSlice";

import classes from "./MainPage.module.scss";

export const MainPage = () => {
  const { isLoading, error, todos } = useSelector(selectTodos);
  const { searchPhrase } = useSelector(selectInputs);

  return (
    <section className={classes.mainPage}>
      <TextureBG bgName="bg__fun" />
      <CreateArea />
      <div className={classes.notes}>
        {todos &&
          todos
            .filter((todo) =>
              searchPhrase
                ? todo.name.toLowerCase().includes(searchPhrase.toLowerCase())
                : todo
            )
            .map((todo) => {
              return (
                <Note
                  key={todo.id}
                  id={todo.id}
                  name={todo.name}
                  status={todo.status}
                  onClickHandle={() => {}}
                  color={todo.color}
                />
              );
            })}
      </div>
    </section>
  );
};

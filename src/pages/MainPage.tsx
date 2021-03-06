import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Backdrop } from "../components/Backdrop";
import { CreateArea } from "../components/CreateArea";
import { Messagebox } from "../components/Messagebox";
import { Note } from "../components/Note";
import TextureBG from "../components/TextureBG";
import { deleteTodo, selectTodos } from "../store/TodosSlice";
import {
  EMessageboxResult,
  selectInputs,
  selectMessagebox,
  showMessageBox,
} from "../store/uiSlice";

import classes from "./MainPage.module.scss";

export const MainPage = () => {
  const { todos, selectedTodo } = useSelector(selectTodos);
  const { searchPhrase } = useSelector(selectInputs);
  const { visible, result } = useSelector(selectMessagebox);
  const dispatch = useDispatch();

  useEffect(() => {
    if (result === EMessageboxResult.ACCEPT) {
      if (selectedTodo) {
        dispatch(deleteTodo(selectedTodo.id));
      }
    }
  }, [result, dispatch, selectedTodo]);

  return (
    <section className={classes.mainPage}>
      <TextureBG bgName="bg__fun" />
      <CreateArea />

      <Backdrop
        visible={visible}
        onClickHandle={(e) => {
          e.stopPropagation();
          dispatch(
            showMessageBox({
              message: "",
              title: "",
              visible: false,
              hasOkButton: false,
              hasCloseButton: false,
              hasCancelButton: false,
              result: EMessageboxResult.CLOSE,
            })
          );
        }}
      />
      <Messagebox />

      <ul className={classes.notes}>
        {todos &&
          todos
            .filter((todo) =>
              searchPhrase
                ? todo.name.toLowerCase().includes(searchPhrase.toLowerCase())
                : todo
            )
            .map((todo) => {
              return (
                <Note key={todo.id} todo={todo} onClickHandle={() => {}} />
              );
            })}
      </ul>
    </section>
  );
};

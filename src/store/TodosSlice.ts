import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ETodoStatus, ITodo } from "../interfaces/ITodo";
import { generateKey } from "../utils/utils";

import { RootState } from "./store";

interface ITodoSliceState {
  todos: Array<ITodo>;
  isLoading: boolean;
  error?: string;
}

const initialState: ITodoSliceState = {
  todos: [],
  isLoading: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: generateKey("note_"),
          name: action.payload,
          status: ETodoStatus.notDone,
        },
      ];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: string; newStatus: ETodoStatus }>
    ) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              status: action.payload.newStatus,
            }
          : todo
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo, changeStatus } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos;
// export const selectActivatedUser = (state: RootState) => state.users.activated;

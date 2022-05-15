import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ETodoStatus, ITodo } from "../interfaces/ITodo";
import { generateKey, generateLightColorHex } from "../utils/utils";

import { RootState } from "./store";

interface ITodoSliceState {
  todos: Array<ITodo>;
  selectedTodo: ITodo | null;
  isLoading: boolean;
  error?: string;
}

const initialState: ITodoSliceState = {
  todos: [
    {
      id: "_1000",
      name: "Create todo list",
      status: ETodoStatus.done,
      color: "#8e8e8e",
    },
  ],
  isLoading: false,
  selectedTodo: null,
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
          color: generateLightColorHex(),
        },
      ];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setSelectedTodo: (state, action: PayloadAction<ITodo>) => {
      state.selectedTodo = action.payload;
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
export const { addTodo, deleteTodo, changeStatus, setSelectedTodo } =
  todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos;
// export const selectActivatedUser = (state: RootState) => state.users.activated;

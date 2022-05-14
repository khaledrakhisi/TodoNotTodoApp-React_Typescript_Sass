import { configureStore } from "@reduxjs/toolkit";

import { todosSlice } from "./TodosSlice";
import { uiSlice } from "./uiSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

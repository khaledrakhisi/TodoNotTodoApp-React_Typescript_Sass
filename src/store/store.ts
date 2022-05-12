import { configureStore } from "@reduxjs/toolkit";

import { uiSlice } from "./uiSlice";
import { usersSlice } from "./userSlice";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    ui: uiSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

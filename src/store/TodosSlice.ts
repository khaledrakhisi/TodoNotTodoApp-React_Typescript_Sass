import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchAllUsers } from "../apis/api";
import { IUser } from "../interfaces/userInterface";

import { RootState } from "./store";

interface IUsersSliceState {
  users: Array<IUser>;
  activated: IUser | null;
  isUserLoading: boolean;
  error?: string;
}

const initialState: IUsersSliceState = {
  users: [],
  isUserLoading: false,
  activated: null,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await fetchAllUsers();
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.users = [
        ...state.users,
        {
          id: state.users.length.toString(),
          name: action.payload,
        },
      ];
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    activateUser: (state, action: PayloadAction<IUser | null>) => {
      state.activated = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllUsers.pending, (state: IUsersSliceState) => {
      state.isUserLoading = true;
    });
    builder.addCase(
      getAllUsers.fulfilled,
      (state: IUsersSliceState, action) => {
        // Add user to the state array
        state.isUserLoading = false;
        state.users = action.payload!;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, activateUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;
export const selectActivatedUser = (state: RootState) => state.users.activated;

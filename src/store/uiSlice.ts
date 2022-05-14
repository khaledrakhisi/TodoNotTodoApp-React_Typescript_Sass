import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITodoName } from "../interfaces/ITodoName";

import { RootState } from "./store";

export interface IInputs {
  todoTitle: string;
  searchPhrase: string;
  isLoading: boolean;
  error?: string;
}

export enum EMessageboxResult {
  ACCEPT = "accept",
  CANCEL = "CANCEL",
  CLOSE = "close",
}

export interface IMessageBoxOptions {
  title: string;
  message: string;
  hasOkButton: boolean;
  hasCloseButton: boolean;
  hasCancelButton: boolean;
  visible: boolean;
  result: EMessageboxResult;
}

interface IUiSliceState {
  inputs: IInputs;
  messagebox: IMessageBoxOptions;
  isCreateAreaExpanded: boolean;
}

const initialState: IUiSliceState = {
  inputs: {
    todoTitle: "",
    searchPhrase: "",
    isLoading: false,
  },
  messagebox: {
    visible: false,
    title: "",
    message: "",
    hasOkButton: false,
    hasCloseButton: true,
    hasCancelButton: false,
    result: EMessageboxResult.CLOSE,
  },
  isCreateAreaExpanded: false,
};

export const getTodoRandomName = createAsyncThunk<ITodoName>(
  "todos/getTodoRandomName",
  async () => {
    const response = await fetch("https://www.boredapi.com/api/activity");
    return await response.json();
  }
);

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    emptyInputs: (state) => {
      state.inputs = { ...initialState.inputs };
    },
    setInput: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.inputs = {
        ...state.inputs,
        [action.payload.name]: action.payload.value,
      };
    },
    showMessageBox: (state, action: PayloadAction<IMessageBoxOptions>) => {
      state.messagebox = action.payload;
    },
    setCreateAreaExpandState: (state, action: PayloadAction<boolean>) => {
      state.isCreateAreaExpanded = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getTodoRandomName.pending, (state: IUiSliceState) => {
      state.inputs.isLoading = true;
    });
    builder.addCase(
      getTodoRandomName.fulfilled,
      (state: IUiSliceState, action) => {
        // Add user to the state array
        state.inputs.isLoading = false;
        state.inputs.todoTitle = action.payload.activity;
      }
    );
    // When a server responses with an error:
    builder.addCase(getTodoRandomName.rejected, (state, { payload }) => {
      // We show the error message
      // and change `status` back to `idle` again.
      state.inputs.isLoading = false;
      if (payload) {
        state.inputs.error = (payload as Error).message;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setInput,
  showMessageBox,
  emptyInputs,
  setCreateAreaExpandState,
} = uiSlice.actions;

export const selectInputs = (state: RootState) => state.ui.inputs;
export const selectMessagebox = (state: RootState) => state.ui.messagebox;
export const selectCreateAreaExpandStatus = (state: RootState) =>
  state.ui.isCreateAreaExpanded;

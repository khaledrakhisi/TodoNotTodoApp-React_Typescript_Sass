import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "./store";

export interface IInputs {
  userName: string;
  passion: string;
  hobbyName: string;
  year: string;
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
}

const initialState: IUiSliceState = {
  inputs: {
    userName: "",
    passion: "",
    hobbyName: "",
    year: "2007",
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
};

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
  },
});

// Action creators are generated for each case reducer function
export const { setInput, showMessageBox, emptyInputs } = uiSlice.actions;

export const selectInputs = (state: RootState) => state.ui;
export const selectMessagebox = (state: RootState) => state.ui.messagebox;

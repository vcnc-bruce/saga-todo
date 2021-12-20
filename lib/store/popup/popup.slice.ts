import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PopupSliceState {
  isVisible: boolean;
  question: string;
}

export interface SetQuestionPayloadActionInterface {
  question: string;
}

export const initialState = (): PopupSliceState => {
  return {
    isVisible: false,
    question: "",
  };
};

const popupSlice = createSlice({
  initialState: initialState(),
  name: "popup",
  reducers: {
    showPopup: (state) => {
      state.isVisible = true;
    },
    hidePopup: (state) => {
      state.isVisible = false;
    },
    setQuestion: (
      state,
      action: PayloadAction<SetQuestionPayloadActionInterface>
    ) => {
      state.question = action.payload.question;
    },
    clearQuestion: () => {
      return initialState();
    },
    onApproveButtonClick: () => {},
    onDenyButtonClick: () => {},
  },
});

// action creator
export const popupActions = popupSlice.actions;

// reducer
export const popupReducer = popupSlice.reducer;

// selector
export const isPopupVisible = (root: RootState) => root.popup.isVisible;
export const popupQuestion = (root: RootState) => root.popup.question;

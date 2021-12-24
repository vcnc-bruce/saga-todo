import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PopupSliceState {
  isVisible: boolean;
  contents: string;
}

export interface ISetContentsPayloadAction {
	contents: string;
}

export const initialState = (): PopupSliceState => {
  return {
    isVisible: false,
		contents: "",
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
    setContents: (
      state,
      action: PayloadAction<ISetContentsPayloadAction>
    ) => {
      state.contents = action.payload.contents;
    },
    clearQuestion: () => {
      return initialState();
    },
    onConfirmButtonClick: () => {},
    onDismissButtonClick: () => {},
  },
});

// action creator
export const popupActions = popupSlice.actions;

// reducer
export const popupReducer = popupSlice.reducer;

// selector
export const isPopupVisible = (root: RootState) => root.popup.isVisible;
export const popupQuestion = (root: RootState) => root.popup.contents;

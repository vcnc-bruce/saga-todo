import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TodoSliceState {}

export const initialState = (): TodoSliceState => {
  return {};
};

const todoSlice = createSlice({
  initialState: initialState(),
  name: "todo",
  reducers: {
    add: () => {},
    delete: () => {},
  },
});

// action creator
export const todoActions = todoSlice.actions;

// reducer
export const todoReducer = todoSlice.reducer;

// selector
export const todoNextToken = (root: RootState) => root.todo.nextToken;
export const todoRides = (root: RootState) => root.todo.rides;

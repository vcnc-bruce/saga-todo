import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Task {
  completed: boolean;
  _id: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoSliceState {
  list: Task[];
}

export const initialState = (): TodoSliceState => {
  return {
    list: [],
  };
};

const todoSlice = createSlice({
  initialState: initialState(),
  name: "todo",
  reducers: {
    requestAddTodo: () => {
      console.log("reaaaaaa");
    },
    requestDeleteTodo: () => {},
    add: () => {},
    delete: () => {},
  },
});

// action creator
export const todoActions = todoSlice.actions;

// reducer
export const todoReducer = todoSlice.reducer;

// selector
export const todoList = (root: RootState) => root.todo.list;

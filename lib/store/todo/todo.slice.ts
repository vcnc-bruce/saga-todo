import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TodoTask } from "../../api/addTask";
interface TodoSliceState {
  list: TodoTask[];
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
    requestAddTodo: (
      state,
      action: PayloadAction<{ description: string }>
    ) => {},
    requestDeleteTodo: (state, action: PayloadAction<{ todoId: string }>) => {},
    add: (state, action: PayloadAction<{ task: TodoTask }>) => {
      state.list.push(action.payload.task);
    },
    delete: (state, action: PayloadAction<{ todoId: string }>) => {
      state.list = state.list.filter(
        (item) => item._id !== action.payload.todoId
      );
    },
  },
});

// action creator
export const todoActions = todoSlice.actions;

// reducer
export const todoReducer = todoSlice.reducer;

// selector
export const todoList = (root: RootState) => root.todo.list;

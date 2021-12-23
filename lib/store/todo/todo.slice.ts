import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TodoTask } from "../../api/addTask";

export interface IRequestAddTodo {
  description: string;
}

export interface IResultAddTodo {
  task: TodoTask;
}

export interface IRequestDeleteTodo {
  todoId: string;
}

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
    endAddTodo: () => {},
    requestAddTodo: (state, action: PayloadAction<IRequestAddTodo>) => {},
    successFetchAddTodo: (state, action: PayloadAction<IResultAddTodo>) => {},
    failedFetchAddTodo: () => {},
    addTodo: (state, action: PayloadAction<IResultAddTodo>) => {
      state.list.push(action.payload.task);
    },
    requestDeleteTodo: (state, action: PayloadAction<IRequestDeleteTodo>) => {},
    successDeleteTodo: (state, action: PayloadAction<IRequestDeleteTodo>) => {},
    failureDeleteTodo: () => {},
    delete: (state, action: PayloadAction<IRequestDeleteTodo>) => {
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

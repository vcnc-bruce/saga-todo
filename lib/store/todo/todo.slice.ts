import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TodoTask } from "../../api/addTask";

export type IRequestAddTodoPayload = Pick<TodoTask, "description">

export interface ITodo {
  task: TodoTask;
}

export interface IRequestDeleteTodo {
  todoId: string;
}

export interface IResultDeleteTodo {
	todoId: string;
}

interface TodoSliceState {
  list: TodoTask[];
}

export interface IFailureFlowAddTodo {
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
		// todo 전체 플로우
		requestFlowAddTodo: (state, action: PayloadAction<IRequestAddTodoPayload>) => {},
		beginFlowAddTodo: () => {},
		successFlowAddTodo: () => {},
		failureFlowAddTodo: (state, action: PayloadAction<IFailureFlowAddTodo>) => {},

		requestRetryFlowAddTodo: (state, action: PayloadAction<IRequestAddTodoPayload>) => {},
		successRetryFlowAddTodo: (state, action: PayloadAction<IRequestAddTodoPayload>) => {},
		failureRetryFlowAddTodo: (state, action: PayloadAction<IRequestAddTodoPayload>) => {},

		// api 성공 후 처리
		requestAfterSuccessfulAddTodoFetch: () => {},
		beginAfterSuccessfulAddTodoFetch: () => {},
		successAfterSuccessfulAddTodoFetch: () => {},
		failureAfterSuccessfulAddTodoFetch: () => {},

		// api 실패 후 처리
		requestAfterFailedAddTodoFetch: (state, action: PayloadAction<IRequestAddTodoPayload>) => {},
		beginAfterFailedAddTodoFetch: () => {},
		successAfterFailedAddTodoFetch: () => {},
		failureAfterFailedAddTodoFetch: () => {},

		// fetch add
		requestFetchAddTodo: (state, action: PayloadAction<IRequestAddTodoPayload>) => {},
		successFetchAddTodo: (state, action: PayloadAction<ITodo>) => {},
		failureFetchAddTodo: () => {},

		// fetch delete
		requestFetchDeleteTodo: (state, action: PayloadAction<IResultDeleteTodo>) => {},
		successFetchDeleteTodo: (state, action: PayloadAction<void>) => {},
		failureFetchDeleteTodo: () => {},

		addTodo: (state, action: PayloadAction<ITodo>) => {
			state.list.push(action.payload.task);
		},
		deleteTodo: (state, action: PayloadAction<IResultDeleteTodo>) => {
			state.list = state.list.filter(todo => todo._id !== action.payload.todoId);
		},
  },
});

// action creator
export const todoActions = todoSlice.actions;

// reducer
export const todoReducer = todoSlice.reducer;

// selector
export const todoList = (root: RootState) => root.todo.list;

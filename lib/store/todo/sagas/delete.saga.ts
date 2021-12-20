import { call, put, take, fork } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import deleteTask, { DeleteTaskInterface } from "../../../api/deleteTask";
import { IRequestDeleteTodo, todoActions } from "../todo.slice";

function* fetchDeleteTask(action: PayloadAction<IRequestDeleteTodo>) {
  const { data, errors }: DeleteTaskInterface = yield call(
    deleteTask,
    action.payload.todoId
  );

  if (errors) {
    console.error("deleteTask Error");
    return;
  }

  if (data) {
    yield put(todoActions.delete(action.payload));
  }
}

function* watchFetchDeleteTask() {
  while (true) {
    const action: PayloadAction<IRequestDeleteTodo> = yield take(
      todoActions.requestDeleteTodo.type
    );
    yield fork(fetchDeleteTask, action);
  }
}

export default watchFetchDeleteTask;

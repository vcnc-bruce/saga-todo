import { call, put, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import deleteTask from "../../../api/deleteTask";
import { IRequestDeleteTodo, todoActions } from "../todo.slice";

function* fetchDeleteSaga(action: PayloadAction<IRequestDeleteTodo>) {
  try {
    yield call(deleteTask, action.payload.todoId);
    yield put(todoActions.deleteTodo(action.payload));
  } catch (error) {
    yield put(todoActions.failedFetchDeleteTodo());
  }

  yield put(todoActions.endDeleteTodo());
}

function* watchDeleteSaga() {
  yield takeEvery(todoActions.requestDeleteTodo.type, fetchDeleteSaga);
}

export default watchDeleteSaga;

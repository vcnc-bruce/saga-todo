import { call, put, take, fork } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import deleteTask, { DeleteTaskInterface } from "../../../api/deleteTask";
import { IRequestDeleteTodo, todoActions } from "../todo.slice";

function* successDeleteSaga(action: PayloadAction<IRequestDeleteTodo>) {
  yield put(todoActions.delete(action.payload));
}

function* failureDeleteSaga() {
  // do something for failure
}

function* fetchDeleteTask(action: PayloadAction<IRequestDeleteTodo>) {
  const { data, errors }: DeleteTaskInterface = yield call(
    deleteTask,
    action.payload.todoId
  );

  if (errors) {
    yield put(todoActions.failureDeleteTodo());
    return;
  }

  if (data) {
    yield put(todoActions.successDeleteTodo(action.payload));
  }
}

function* flowDeleteSaga() {
  while (true) {
    const apiRequestAction: PayloadAction<IRequestDeleteTodo> = yield take(
      todoActions.requestDeleteTodo.type
    );
    yield fork(fetchDeleteTask, apiRequestAction);

    const apiResultAction: PayloadAction<IRequestDeleteTodo> = yield take([
      todoActions.successDeleteTodo,
      todoActions.failureDeleteTodo,
    ]);

    switch (apiResultAction.type) {
      case todoActions.successDeleteTodo.type:
        yield fork(successDeleteSaga, apiResultAction);
        break;
      case todoActions.failureDeleteTodo.type:
        yield fork(failureDeleteSaga);
        break;
      default:
        throw new Error("aa");
    }
  }
}

export default flowDeleteSaga;

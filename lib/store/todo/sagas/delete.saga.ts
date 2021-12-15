import { call, put, take } from "@redux-saga/core/effects";
import deleteTask, { DeleteTaskInterface } from "../../../api/deleteTask";
import { todoActions } from "../todo.slice";

function* fetchDeleteTask(todoId: string) {
  const { data, errors }: DeleteTaskInterface = yield call(deleteTask, todoId);

  if (errors) {
    console.log("deleteTask");
    console.error(errors);
    return;
  }

  if (data) {
    yield put(todoActions.delete({ todoId }));
  }
}

function* watchFetchDeleteTask() {
  while (true) {
    const {
      payload: { todoId },
    } = yield take(todoActions.requestDeleteTodo);
    yield fetchDeleteTask(todoId);
  }
}

export default watchFetchDeleteTask;

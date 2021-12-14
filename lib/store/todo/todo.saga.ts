import { call, put, select, take } from "@redux-saga/core/effects";
import addTask, { AddTaskInterface } from "../../api/addTask";
import deleteTask, { DeleteTaskInterface } from "../../api/deleteTask";
import { todoActions } from "./todo.slice";

function* fetchAddTask(description: string) {
  const { data, errors }: AddTaskInterface = yield call(addTask, description);

  if (errors) {
    console.log("addTask");
    console.error(errors);
    return;
  }

  if (data) {
    yield put(todoActions.add({ task: data }));
  }
}

function* watchFetchAddTask() {
  const {
    payload: { description },
  } = yield take(todoActions.requestAddTodo);
  yield fetchAddTask(description);
}

function* fetchDeleteTask(todoId: string) {
  // TODO: Redux에서 가져오기
  const { data, errors }: DeleteTaskInterface = yield call(deleteTask, todoId);

  console.log("fdt");
  console.log(data);
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
  const {
    payload: { todoId },
  } = yield take(todoActions.requestDeleteTodo);
  yield fetchDeleteTask(todoId);
}

export default [watchFetchAddTask, watchFetchDeleteTask];

import { call, put, take } from "@redux-saga/core/effects";
import addTask, { AddTaskInterface } from "../../../api/addTask";
import { todoActions } from "../todo.slice";

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
  while (true) {
    const {
      payload: { description },
    } = yield take(todoActions.requestAddTodo);
    yield fetchAddTask(description);
  }
}

export default watchFetchAddTask;

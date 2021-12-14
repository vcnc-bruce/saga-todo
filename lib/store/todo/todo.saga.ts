import { call, put, select, take } from "@redux-saga/core/effects";
import addTask, { addTaskInterface } from "../../api/addTask";
import { todoActions } from "./todo.slice";

function* fetchAddTask() {
  // TODO: Redux에서 가져오기
  const { data, errors }: addTaskInterface = yield call(addTask, "addTask");

  if (errors) {
    console.log("addTask");
    console.error(errors);
    return;
  }

  // 추가한 데이터를 리덕스 갱신
}
function* watchFetchAddTask() {
  yield take(todoActions.requestAddTodo);
  yield fetchAddTask();
  return;
}

export default [watchFetchAddTask];

import { call, put, take, fork, takeEvery } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import addTask, { AddTaskInterface, TodoTask } from "../../../api/addTask";
import withPopupSaga from "../../popup/popup.saga";
import { popupActions } from "../../popup/popup.slice";
import { IRequestAddTodo, IResultAddTodo, todoActions } from "../todo.slice";

// 가능해보이는것 받아오는 함수를 만드는 factory 함수도 만들 수 있지않나?
function* failureFetchAddTask(action: PayloadAction<IRequestAddTodo>) {
  const { type } = yield take([
    popupActions.onApproveButtonClick.type,
    popupActions.onDenyButtonClick.type,
  ]);

  switch (type) {
    case popupActions.onApproveButtonClick.type:
      yield put(todoActions.requestAddTodo(action.payload));
      break;
    case popupActions.onDenyButtonClick.type:
    default:
      yield put(todoActions.failureAddTodo());
  }
}

function* successFetchAddTask(action: PayloadAction<IResultAddTodo>) {
  const { type } = yield take([
    popupActions.onApproveButtonClick.type,
    popupActions.onDenyButtonClick.type,
  ]);

  switch (type) {
    case popupActions.onApproveButtonClick.type:
      yield put(todoActions.addTodo(action.payload));
      break;
    case popupActions.onDenyButtonClick.type:
    default:
      yield put(todoActions.failureAddTodo());
      // TODO: delete 요청 보내기
      console.log("delte 요청");
  }
}

function* fetchAddTask(action: PayloadAction<IRequestAddTodo>) {
  const { data, errors }: AddTaskInterface = yield call(
    addTask,
    action.payload.description
  );

  if (errors) {
    yield put(todoActions.failureAddTodo());
  }

  if (data) {
    yield put(todoActions.successAddTodo({ task: data }));
  }
}

function* watchFetchAddTask() {
  while (true) {
    const apiRequestAction: PayloadAction<IRequestAddTodo> = yield take(
      todoActions.requestAddTodo.type
    );
    yield fork(fetchAddTask, apiRequestAction);

    const apiResultAction: PayloadAction = yield take([
      todoActions.successAddTodo.type,
      todoActions.failureAddTodo.type,
    ]);

    switch (apiResultAction.type) {
      case todoActions.successAddTodo.type:
        yield fork(
          withPopupSaga(successFetchAddTask, {
            question: "정말 추가하시겠습니까",
          }),
          apiResultAction
        );
        break;
      case todoActions.failureAddTodo.type:
        yield fork(
          withPopupSaga(failureFetchAddTask, {
            question: "다시 시도하시겠습니까",
          }),
          apiRequestAction
        );
        break;
      default:
        // TODO: 수정
        throw new Error("ddddd");
    }
  }
}

export default watchFetchAddTask;

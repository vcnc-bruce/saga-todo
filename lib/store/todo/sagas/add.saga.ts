import { call, put, take, fork } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import addTask, { AddTaskInterface, TodoTask } from "../../../api/addTask";
import popupSaga from "../../popup/popup.saga";
import { popupActions } from "../../popup/popup.slice";
import { IRequestAddTodo, IResultAddTodo, todoActions } from "../todo.slice";

function* failureFetchAddSaga(action: PayloadAction<IRequestAddTodo>) {
  const popupResultAction: PayloadAction = yield call(popupSaga, {
    question: "다시 시도하시겠습니까",
  });

  switch (popupResultAction.type) {
    case popupActions.onApproveButtonClick.type:
      yield put(todoActions.requestAddTodo(action.payload));
      break;
    case popupActions.onDenyButtonClick.type:
    default:
    // do nothing
  }

  // 새로 reuqest한다고해도 하나의 add 플로우는 끝났기에 end를 put한다
  yield put(todoActions.endAddTodo());
}

function* successFetchAddSaga(action: PayloadAction<IResultAddTodo>) {
  const popupResultAction: PayloadAction = yield call(popupSaga, {
    question: "정말 추가하시겠습니까",
  });

  switch (popupResultAction.type) {
    case popupActions.onApproveButtonClick.type:
      yield put(todoActions.addTodo(action.payload));
      yield put(todoActions.endAddTodo());
      break;
    case popupActions.onDenyButtonClick.type:
    default:
      // TODO: 이 부분을 사가를 그냥 call할지 아니면
      // 그래도 deleteRequest를 해야할지 고민 좀해보고 end를 꽂을지도 고민해봐야함
      yield put(
        todoActions.requestDeleteTodo({ todoId: action.payload.task._id })
      );
  }

  yield put(todoActions.endAddTodo());
}

function* fetchAddSaga(action: PayloadAction<IRequestAddTodo>) {
  try {
    const { data: task }: AddTaskInterface = yield call(
      addTask,
      action.payload.description
    );
    yield put(todoActions.successFetchAddTodo({ task }));
  } catch (error) {
    yield put(todoActions.failedFetchAddTodo());
  }
}

function* watchAddSaga() {
  while (true) {
    const apiRequestAction: PayloadAction<IRequestAddTodo> = yield take(
      todoActions.requestAddTodo.type
    );
    yield fork(fetchAddSaga, apiRequestAction);

    const apiResultAction: PayloadAction<IResultAddTodo> = yield take([
      todoActions.successFetchAddTodo.type,
      todoActions.failedFetchAddTodo.type,
    ]);

    switch (apiResultAction.type) {
      case todoActions.successFetchAddTodo.type:
        yield fork(successFetchAddSaga, apiResultAction);
        break;
      case todoActions.failedFetchAddTodo.type:
        yield fork(failureFetchAddSaga, apiRequestAction);
        break;
      default:
        throw new Error("ddddd");
    }
  }
}

export default watchAddSaga;

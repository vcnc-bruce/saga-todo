import { put, call, take } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { popupActions, SetQuestionPayloadActionInterface } from "./popup.slice";

// function withPopupSaga<T, Fn extends (...args: any[]) => T>(
//   saga: Fn,
//   payload: SetQuestionPayloadActionInterface
// ): any {
//   return function* popupSaga(...args: Parameters<Fn>) {
//     try {
//       yield put(popupActions.setQuestion(payload));
//       yield put(popupActions.showPopup());
//       const res: T = yield call(saga, ...args);
//       yield put(popupActions.clearQuestion());
//       yield put(popupActions.hidePopup());
//       return res;
//     } catch (e) {
//       console.error("error happend in withPopupSaga");
//       yield put(popupActions.clearQuestion());
//       yield put(popupActions.hidePopup());
//     }
//   };
// }

// export default withPopupSaga;

function* popupSaga(payload: SetQuestionPayloadActionInterface) {
  try {
    yield put(popupActions.setQuestion(payload));
    yield put(popupActions.showPopup());
    const clickedButton: PayloadAction = yield take([
      popupActions.onApproveButtonClick,
      popupActions.onDenyButtonClick,
    ]);
    yield put(popupActions.clearQuestion());
    yield put(popupActions.hidePopup());
    return clickedButton;
  } catch (e) {
    console.error("error happend in withPopupSaga");
    yield put(popupActions.clearQuestion());
    yield put(popupActions.hidePopup());
  }
}

export default popupSaga;

import { put, call } from "@redux-saga/core/effects";
import { popupActions, SetQuestionPayloadActionInterface } from "./popup.slice";

function withPopupSaga<T, Fn extends (...args: any[]) => T>(
  saga: Fn,
  payload: SetQuestionPayloadActionInterface
): any {
  return function* popupSaga(...args: Parameters<Fn>) {
    console.log("in popupSaga");
    try {
      yield put(popupActions.setQuestion(payload));
      yield put(popupActions.showPopup());
      const res: T = yield call(saga, ...args);
      yield put(popupActions.clearQuestion());
      yield put(popupActions.hidePopup());
      return res;
    } catch (e) {
      console.error("error happend in withPopupSaga");
      yield put(popupActions.clearQuestion());
      yield put(popupActions.hidePopup());
    }
  };
}

export default withPopupSaga;

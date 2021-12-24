import {call, put, take, fork, takeEvery, takeLeading} from "@redux-saga/core/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import addTask, {AddTaskInterface} from "../../../api/addTask";
import {popupActions} from "../../popup/popup.slice";
import {IRequestAddTodoPayload, ITodo, todoActions} from "../todo.slice";

function* fetchAddSaga(action: PayloadAction<IRequestAddTodoPayload>) {
	try {
		const {data: task}: AddTaskInterface = yield call(
			addTask,
			action.payload.description
		);
		yield put(todoActions.successFetchAddTodo({task}));
	} catch (error) {
		yield put(todoActions.failureFetchAddTodo());
	}
}

function* flowSuccessAdd(action: PayloadAction<ITodo>) {
	yield put(todoActions.beginAfterSuccessfulAddTodoFetch());
	yield put(popupActions.setContents({contents: '정말 추가하시겠습니까?'}));
	yield put(popupActions.showPopup());
	const userButtonClickAction: PayloadAction = yield take([popupActions.onConfirmButtonClick.type, popupActions.onDismissButtonClick.type]);

	switch (userButtonClickAction.type) {
		case popupActions.onConfirmButtonClick.type:
			yield put(todoActions.addTodo(action.payload));
			yield put(todoActions.successAfterSuccessfulAddTodoFetch());
			break;
		case popupActions.onDismissButtonClick.type:
			yield put(todoActions.failureAfterSuccessfulAddTodoFetch());
			break;
		default:
			break;
	}
}

function* flowFailureAdd(action: PayloadAction<IRequestAddTodoPayload>) {
	yield put(todoActions.beginAfterFailedAddTodoFetch());
	yield put(popupActions.setContents({contents: '다시 시도하시겠습니까?'}));
	const userButtonClickAction: PayloadAction = yield take([popupActions.onConfirmButtonClick.type, popupActions.onDismissButtonClick.type]);
	switch (userButtonClickAction.type) {
		case popupActions.onConfirmButtonClick.type:
			yield put(todoActions.successAfterFailedAddTodoFetch());
			break;
		case popupActions.onDismissButtonClick.type:
			yield put(todoActions.failureAfterFailedAddTodoFetch());
			break;
		default:
			break;
	}
}

function* workAddSaga(action: PayloadAction<IRequestAddTodoPayload>) {
	yield put(todoActions.beginFlowAddTodo());
	yield fork(fetchAddSaga, action)
	const fetchAddTodoAction: PayloadAction<ITodo> = yield take([todoActions.successFetchAddTodo.type, todoActions.failureFetchAddTodo.type]);

	switch (fetchAddTodoAction.type) {
		case todoActions.successFetchAddTodo.type:
			yield fork(flowSuccessAdd, fetchAddTodoAction);
			yield take([todoActions.successAfterSuccessfulAddTodoFetch.type, todoActions.failureAfterSuccessfulAddTodoFetch.type]);
			yield put(todoActions.successFlowAddTodo());
			break;
		case todoActions.failureFetchAddTodo.type:
			yield fork(flowFailureAdd, action);
			const successFlowFailureAddAction: PayloadAction = yield take(
				[todoActions.successAfterFailedAddTodoFetch.type, todoActions.failureAfterSuccessfulAddTodoFetch.type]
			);
			if (successFlowFailureAddAction.type === todoActions.successAfterFailedAddTodoFetch.type) {
				yield put(todoActions.failureFlowAddTodo({}));
				yield put(todoActions.requestRetryFlowAddTodo(action.payload));
			} else {
				yield put(todoActions.failureFlowAddTodo({}));
			}
			break;
		default:
			break;
	}
}

function* watchAddSaga(action: PayloadAction<IRequestAddTodoPayload>) {
	yield takeLeading(todoActions.requestFlowAddTodo.type, workAddSaga);
}

function* watchRetryAddTodo(action: PayloadAction<IRequestAddTodoPayload>) {
	yield takeEvery(todoActions.requestRetryFlowAddTodo.type, workAddSaga);
}

export default [watchAddSaga, watchRetryAddTodo];

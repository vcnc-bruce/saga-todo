import { all, call } from "@redux-saga/core/effects";
import todoSaga from "./todo/todo.saga";

const allSagas = [...todoSaga];

export default function* root() {
  yield all(allSagas.map(call));
}

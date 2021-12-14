import { Store } from "redux";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import createSagaMiddleware, { Task } from "redux-saga";
import rootReducer, { CombinedReducerState } from "./root.reducer";
import rootSaga from "./root.saga";

export interface SagaStore extends Store {
  sagaTask?: Task;
}

export let store: EnhancedStore;

const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return [...getDefaultMiddleware(), sagaMiddleware];
    },
  });

  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper<RootState>(makeStore);

export type RootState = CombinedReducerState;
export type AppDispatch = typeof store.dispatch;

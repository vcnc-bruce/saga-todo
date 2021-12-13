import { AnyAction, combineReducers, Reducer } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import deepmerge from "deepmerge";
import { RootState } from "./store";
import { todoReducer } from "./todo/todo.slice";

export const combinedReducer = combineReducers({
  todo: todoReducer,
});

export type CombinedReducerState = ReturnType<typeof combinedReducer>;

export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = deepmerge(state, action.payload, {
      arrayMerge: (destinationArray, sourceArray, options) => sourceArray,
    });
    return nextState;
  }

  return combinedReducer(state, action);
};

export default rootReducer;

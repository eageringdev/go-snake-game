import { configureStore, Store } from "@reduxjs/toolkit";

// import reducers
import reducer, { AppState } from "./reducers";

// import types
import { StoreAction } from "./types";
type DispatchType = (args: AppState) => StoreAction;

const store: Store<AppState, StoreAction> = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import beersReducer from "./beersSlice";

export const store = configureStore({
  reducer: {
    beers: beersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type rootState = ReturnType<typeof store.getState>;

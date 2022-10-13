import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";


export const createStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

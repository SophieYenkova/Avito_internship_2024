import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import sortReducer from "../store/sortSlice";
import sortOrdersReducer from "../store/ordersSortSlice";
import imageReducer from "../store/imageSlice";
import oneAdDataReducer from "../store/oneAdSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    sort: sortReducer,
    sortOrders: sortOrdersReducer,
    image: imageReducer,
    oneAdData: oneAdDataReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

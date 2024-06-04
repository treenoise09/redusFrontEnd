import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice/formSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import { configureStore } from "@reduxjs/toolkit";

import todoReducer, { InitialTodo } from "./features/todoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export interface RootState {
  todo: {
    todo: InitialTodo[];
    isEdit: string | null;
    checkedAll: boolean;
  };
}

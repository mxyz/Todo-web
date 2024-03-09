import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reducers/todoSlice"; // Assuming you have a todoSlice

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    // Add other reducers here if needed
  },
  // Add middleware, devTools, etc. if needed
});

export type RootState = ReturnType<typeof store.getState>;

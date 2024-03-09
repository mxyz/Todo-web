import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../types/taskTypes";

interface TodoState {
  todos: ITask[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosSuccess(state, action: PayloadAction<ITask[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<ITask>) {
      state.todos.push(action.payload);
    },
    updateTitleTodo(
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) {
      const { id, title } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = title;
      }
    },
    toggleTodo(
      state,
      action: PayloadAction<{ id: string; completed: boolean }>
    ) {
      const { id, completed } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = completed;
      }
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const {
  fetchTodosSuccess,
  addTodo,
  updateTitleTodo,
  toggleTodo,
  removeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;

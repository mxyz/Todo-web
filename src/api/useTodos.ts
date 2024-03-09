import useAxios from "axios-hooks";
import { useCallback, useEffect, useMemo } from "react";
import { ITask } from "../types/taskTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  addTodo,
  fetchTodosSuccess,
  removeTodo,
  toggleTodo,
  updateTitleTodo,
} from "../reducers/todoSlice";

const useTodos = () => {
  const { todos } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [{ data: todoListData, loading: isLoadingTodoList }, refetch] =
    useAxios(`http://localhost:3001/todos`);

  const todoList = useMemo(() => {
    return todoListData?.map((todo: ITask) => ({ ...todo })) || [];
  }, [todoListData]);

  useEffect(() => {
    if (todoList) {
      dispatch(fetchTodosSuccess(todoList));
    }
  }, [dispatch, todoList]);

  const completedTaskCount: number = useMemo(() => {
    if (todos) {
      return todos?.filter((todo: ITask) => todo.completed)?.length || 0;
    }
    return 0;
  }, [todos]);

  const [, addNewTask] = useAxios(
    {
      url: `http://localhost:3001/todos`,
      method: "POST",
    },
    { manual: true }
  );

  // add new task
  const onAddNewTask = useCallback(
    (title: string) => {
      addNewTask({ data: { title: title.trim(), completed: false } })
        .then((response) => {
          dispatch(addTodo(response.data));
        })
        .finally(() => refetch());
    },
    [addNewTask, dispatch, refetch]
  );
  // PATCH
  const [{ loading: updateTaskLoading }, updateTask] = useAxios(
    {
      url: `http://localhost:3001/todos/`, // Note: taskId will be appended later
      method: "PATCH",
    },
    { manual: true }
  );

  // update completed task
  const onUpdateCompleteTask = useCallback(
    (taskId: string, completed: boolean) => {
      if (updateTaskLoading) return;
      updateTask({
        url: `http://localhost:3001/todos/${taskId}`,
        data: { completed },
      })
        .then((response) => {
          dispatch(toggleTodo({ id: taskId, completed }));
        })
        .finally(() => refetch());
    },
    [dispatch, refetch, updateTask, updateTaskLoading]
  );

  // update title task
  const onUpdateTitleTask = useCallback(
    (taskId: string, title: string) => {
      updateTask({
        url: `http://localhost:3001/todos/${taskId}`,
        data: { title },
      })
        .then((response) => {
          const { id, title } = response.data;
          dispatch(updateTitleTodo({ id, title }));
        })
        .finally(() => refetch());
    },
    [dispatch, refetch, updateTask]
  );
  // DELETE
  const [, deleteTask] = useAxios(
    {
      url: `http://localhost:3001/todos/`, // Note: taskId will be appended later
      method: "DELETE",
    },
    { manual: true }
  );

  // delete task
  const onDeleteTask = useCallback(
    (taskId: string) => {
      deleteTask({
        url: `http://localhost:3001/todos/${taskId}`,
      })
        .then((response) => {
          const { id } = response.data;
          dispatch(removeTodo(id));
        })
        .finally(() => refetch());
    },
    [deleteTask, dispatch, refetch]
  );

  return {
    todoList: todos,
    todoListCount: todos?.length || 0,
    isLoadingTodoList,
    completedTaskCount,
    onAddNewTask,
    onUpdateCompleteTask,
    onUpdateTitleTask,
    onDeleteTask,
  };
};

export default useTodos;

import useAxios from "axios-hooks";
import { useCallback, useMemo } from "react";

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

const useTodos = () => {
  const [{ data, loading: isLoadingTodoList }, refetch] = useAxios(
    `http://localhost:3001/todos`
  );

  const todoList = useMemo(() => {
    return data?.map((todo: ITask) => ({ ...todo })) || [];
  }, [data]);

  const completedTaskCount: number = useMemo(() => {
    if (todoList) {
      return todoList?.filter((todo: ITask) => todo.completed)?.length || 0;
    }
    return 0;
  }, [todoList]);

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
      addNewTask({ data: { title, completed: false } }).then(() => refetch());
    },
    [addNewTask, refetch]
  );
  // PATCH
  const [, updateCompleteTask] = useAxios(
    {
      url: `http://localhost:3001/todos/`, // Note: taskId will be appended later
      method: "PATCH",
    },
    { manual: true }
  );

  // update completed task
  const onUpdateCompleteTask = useCallback(
    (taskId: string, completed: boolean) => {
      updateCompleteTask({
        url: `http://localhost:3001/todos/${taskId}`,
        data: { completed },
      }).then(() => refetch());
    },
    [refetch, updateCompleteTask]
  );

  // update title task
  const onUpdateTitleTask = useCallback(
    (taskId: string, title: string) => {
      updateCompleteTask({
        url: `http://localhost:3001/todos/${taskId}`,
        data: { title },
      }).then(() => refetch());
    },
    [refetch, updateCompleteTask]
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
      }).then(() => refetch());
    },
    [deleteTask, refetch]
  );

  return {
    todoList: todoList,
    todoListCount: todoList?.length || 0,
    isLoadingTodoList,
    completedTaskCount,
    onAddNewTask,
    onUpdateCompleteTask,
    onUpdateTitleTask,
    onDeleteTask,
  };
};

export default useTodos;

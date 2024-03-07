import useAxios from "axios-hooks";
import { useCallback, useMemo } from "react";

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

const useTodos = () => {
  const [{ data: todoList, loading }, refetch] = useAxios(
    `http://localhost:3001/todos`
  );
  const completedTaskCount: number = useMemo(() => {
    if (todoList) {
      return todoList?.filter((todo: ITask) => todo.completed)?.length || 0;
    }
    return 0;
  }, [todoList]);
  const [, addTask] = useAxios(
    {
      url: `http://localhost:3001/todos`,
      method: "POST",
    },
    { manual: true }
  );
  const onAddTask = useCallback(
    (task: ITask) => {
      addTask({ data: task });
    },
    [addTask]
  );

  return {
    todoList: todoList,
    completedTaskCount,
    onAddTask,
  };
};

export default useTodos;

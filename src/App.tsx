import { useCallback, useMemo, useState } from "react";
import "./App.scss";
import ProgressBarPresenter from "./presenters/ProgressBarPresenter";
import TaskListPresenter from "./presenters/TaskListPresenter";
import useTodos, { ITask } from "./api/useTodos";

export enum OPTION_VALUE {
  ALL = "All",
  DONE = "Done",
  UNDONE = "Undone",
}

export interface IOption {
  label: OPTION_VALUE;
  value: OPTION_VALUE;
}

export const OPTIONS: IOption[] = [
  { label: OPTION_VALUE.ALL, value: OPTION_VALUE.ALL },
  { label: OPTION_VALUE.DONE, value: OPTION_VALUE.DONE },
  { label: OPTION_VALUE.UNDONE, value: OPTION_VALUE.UNDONE },
];

function App() {
  const {
    todoList,
    todoListCount,
    completedTaskCount,
    onUpdateCompleteTask,
    onUpdateTitleTask,
    onAddNewTask,
    onDeleteTask,
  } = useTodos();
  const [filter, setFilter] = useState(OPTION_VALUE.ALL);

  const _todoList: ITask[] = useMemo(() => {
    switch (filter) {
      case OPTION_VALUE.DONE:
        return todoList.filter((todo: ITask) => todo.completed) ?? [];
      case OPTION_VALUE.UNDONE:
        return todoList.filter((todo: ITask) => !todo.completed) ?? [];
      default:
        return todoList ?? [];
    }
  }, [filter, todoList]);

  const onChangeFilter = useCallback((value: string) => {
    setFilter(value as OPTION_VALUE);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <section className="progress-bar-section">
          <ProgressBarPresenter
            tasksCount={todoListCount}
            completedTaskCount={completedTaskCount}
          />
        </section>
        <section className="task-list-section">
          <TaskListPresenter
            tasks={_todoList}
            seletedFilterOption={filter}
            filterOptions={OPTIONS}
            onChangeFilter={onChangeFilter}
            onUpdateCompleteTask={onUpdateCompleteTask}
            onUpdateTitleTask={onUpdateTitleTask}
            onAddNewTask={onAddNewTask}
            onDeleteTask={onDeleteTask}
          />
        </section>
      </div>
    </div>
  );
}

export default App;

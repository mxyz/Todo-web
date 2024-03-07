import { useCallback, useMemo, useState } from "react";
import "./App.scss";
import useTodos from "./api/useTodos";
import ProgressBarPresenter from "./presenters/ProgressBarPresenter";
import TaskListPresenter from "./presenters/TaskListPresenter";

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
  const { todoList, completedTaskCount } = useTodos();
  const [filter, setFilter] = useState(OPTION_VALUE.ALL);

  const todoListCount = useMemo(() => {
    return todoList?.length || 0;
  }, [todoList?.length]);

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
            seletedFilterOption={filter}
            filterOptions={OPTIONS}
            onChangeFilter={onChangeFilter}
          />
        </section>
      </div>
    </div>
  );
}

export default App;

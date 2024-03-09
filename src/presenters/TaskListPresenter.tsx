import { IOption, OPTION_VALUE } from "../App";
import { ITask } from "../api/useTodos";
import Dropdown from "../components/Dropdown";
import NewTaskItem from "../components/NewTaskItem";
import TaskItem from "../components/TaskItem";
import "./TaskListPresenter.scss";

export interface IPropsTaskListPresenter {
  seletedFilterOption: OPTION_VALUE;
  filterOptions: IOption[];
  onChangeFilter: (option: string) => void;
  tasks?: ITask[];
  onUpdateCompleteTask: (taskId: string, completed: boolean) => void;
  onUpdateTitleTask: (taskId: string, title: string) => void;
  onAddNewTask: (title: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskListPresenter = (props: IPropsTaskListPresenter) => {
  const {
    tasks,
    filterOptions,
    seletedFilterOption = OPTION_VALUE.ALL,
    onChangeFilter,
    onUpdateCompleteTask,
    onUpdateTitleTask,
    onAddNewTask,
    onDeleteTask,
  } = props;
  return (
    <div className="task-list-presenter">
      <div className="header-wrapper">
        <span className="header">Tasks</span>
        <Dropdown
          selectedOptionValue={seletedFilterOption}
          options={filterOptions}
          onChange={onChangeFilter}
        />
      </div>
      <section className="tasks-wrapper" id="tasks-section">
        {(tasks?.length || 0) > 0 ? (
          tasks?.map((task: ITask) => (
            <TaskItem
              key={task.id}
              title={task.title}
              id={task.id}
              completed={task.completed}
              onClickComplele={onUpdateCompleteTask}
              onEditTitle={onUpdateTitleTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        ) : (
          <span>There is no tasks</span>
        )}

        <NewTaskItem key={"new-task"} onSubmitTask={onAddNewTask} />
      </section>
    </div>
  );
};
export default TaskListPresenter;

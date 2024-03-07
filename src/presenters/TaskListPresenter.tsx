import { IOption, OPTION_VALUE } from "../App";
import { ITask } from "../api/useTodos";
import Dropdown from "../components/Dropdown";
import "./TaskListPresenter.scss";

export interface IPropsTaskListPresenter {
  seletedFilterOption: OPTION_VALUE;
  filterOptions: IOption[];
  onChangeFilter: (option: string) => void;
  tasks?: ITask[];
}

const TaskListPresenter = (props: IPropsTaskListPresenter) => {
  const {
    tasks,
    filterOptions,
    seletedFilterOption = OPTION_VALUE.ALL,
    onChangeFilter,
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
    </div>
  );
};
export default TaskListPresenter;

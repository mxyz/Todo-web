import { useCallback } from "react";
import { ITask } from "../api/useTodos";
import Option from "./Option";

export interface IPropsTaskItem extends ITask {
  onClickComplele: (id: string, checked: boolean) => void;
  isEditing?: boolean;
}

const TaskItem = (props: IPropsTaskItem) => {
  const { id, title, completed, onClickComplele } = props;
  const onClickCheckbox = useCallback(() => {
    onClickComplele(id, !completed);
  }, [completed, id, onClickComplele]);
  return (
    <div>
      <input type="checkbox" checked={completed} onClick={onClickCheckbox} />
      <span>{title}</span>
      <Option>a</Option>
    </div>
  );
};

export default TaskItem;

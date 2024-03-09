import { useCallback, useState } from "react";
import Option from "./Option";
import Checkbox from "./Checkbox";
import "./TaskItem.scss";
import classNames from "classnames";
import NewTaskItem from "./NewTaskItem";
import { ITask } from "../types/taskTypes";

export interface IPropsTaskItem extends ITask {
  onClickComplele?: (id: string, checked: boolean) => void;
  onEditTitle: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem = (props: IPropsTaskItem) => {
  const { id, title, completed, onClickComplele, onEditTitle, onDeleteTask } =
    props;
  const [isEditing, setIsEditing] = useState(false);

  const onClickCheckbox = useCallback(() => {
    onClickComplele?.(id, !completed);
  }, [completed, id, onClickComplele]);

  const onClickEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const onClickEditTaskTitle = useCallback(
    (newTitle: string) => {
      if (newTitle) {
        onEditTitle(id, newTitle);
        onClickEdit();
      }
    },
    [id, onClickEdit, onEditTitle]
  );

  const onClickDeleteTask = useCallback(() => {
    onDeleteTask(id);
  }, [id, onDeleteTask]);

  return (
    <>
      {!isEditing && (
        <div className="task-item">
          <>
            <div className="content">
              <Checkbox checked={completed} onChange={onClickCheckbox} />
              <span className={classNames({ "line-through": completed })}>
                {title}
              </span>
            </div>
            <Option onEdit={onClickEdit} onDelete={onClickDeleteTask} />
          </>
        </div>
      )}
      {isEditing && (
        <NewTaskItem
          initTitle={title}
          placeholder={title}
          onSubmitTask={onClickEditTaskTitle}
        />
      )}
    </>
  );
};

export default TaskItem;

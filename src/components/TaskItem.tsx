import { useCallback, useState } from "react";
import { ITask } from "../api/useTodos";
import Option from "./Option";
import Checkbox from "./Checkbox";
import "./TaskItem.scss";
import classNames from "classnames";

export interface IPropsTaskItem extends ITask {
  onClickComplele?: (id: string, checked: boolean) => void;
  onEditTitle: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem = (props: IPropsTaskItem) => {
  const { id, title, completed, onClickComplele, onEditTitle, onDeleteTask } =
    props;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState<string | undefined>(title);

  const onClickCheckbox = useCallback(() => {
    onClickComplele?.(id, !completed);
  }, [completed, id, onClickComplele]);

  const onClickEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const onClickEditTaskTitle = useCallback(() => {
    if (newTitle) {
      onEditTitle(id, newTitle);
      onClickEdit();
    }
  }, [id, newTitle, onClickEdit, onEditTitle]);

  const onClickDeleteTask = useCallback(() => {
    onDeleteTask(id);
  }, [id, onDeleteTask]);

  return (
    <div className="task-item">
      {!isEditing && (
        <>
          <div className="content">
            <Checkbox checked={completed} onChange={onClickCheckbox} />
            <span className={classNames({ "line-through": completed })}>
              {title}
            </span>
          </div>
          <Option onEdit={onClickEdit} onDelete={onClickDeleteTask} />
        </>
      )}
      {isEditing && (
        <>
          <input
            value={newTitle}
            placeholder={title}
            onChange={(event) => setNewTitle(event.target.value)}
          />
          <button onClick={onClickEditTaskTitle}>save</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;

import { useCallback, useState } from "react";
import "./NewTaskItem.scss";

export interface IPropsNewTaskItem {
  onAddNewTask: (title: string) => void;
}

const NewTaskItem = (props: IPropsNewTaskItem) => {
  const { onAddNewTask: _onAddTask } = props;
  const [title, setTitle] = useState<string | undefined>(undefined);

  const onAddTask = useCallback(() => {
    if (title) {
      _onAddTask(title);
    }
  }, [_onAddTask, title]);

  return (
    <div className="task-item">
      <input
        value={title}
        placeholder={"Add your todo..."}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button onClick={onAddTask}>Add</button>
    </div>
  );
};

export default NewTaskItem;

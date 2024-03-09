import { useCallback, useState, KeyboardEvent } from "react";
import "./NewTaskItem.scss";
import Button from "./Button";

export interface IPropsNewTaskItem {
  initTitle?: string;
  placeholder?: string;
  onSubmitTask: (title: string) => void;
  buttonLabel?: string;
}

const NewTaskItem = (props: IPropsNewTaskItem) => {
  const {
    initTitle,
    placeholder = "Add your todo...",
    onSubmitTask,
    buttonLabel = "Save",
  } = props;
  const [title, setTitle] = useState<string>(initTitle || "");

  const onClickSubmit = useCallback(() => {
    if (title) {
      onSubmitTask(title);
      setTitle("");
    } else if (title.trim().length === 0 && initTitle) {
      onSubmitTask(initTitle);
    }
  }, [initTitle, onSubmitTask, title]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClickSubmit();
    }
  };

  return (
    <div className="new-task-item">
      <input
        className="new-task-input"
        value={title}
        maxLength={150}
        placeholder={placeholder}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {title.length > 0 && (
        <Button onClick={onClickSubmit}>{buttonLabel}</Button>
      )}
    </div>
  );
};

export default NewTaskItem;

import ProgressBar, { IPropsProgressBar } from "../components/ProgressBar";
import "./ProgressBarPresenter.scss";

export type IPropsProgressBarPresenter = IPropsProgressBar;

const ProgressBarPresenter = (props: IPropsProgressBarPresenter) => {
  const { tasksCount, completedTaskCount } = props;
  return (
    <div className="progress-bar-presenter">
      <span className="header">Progress</span>
      <ProgressBar
        tasksCount={tasksCount}
        completedTaskCount={completedTaskCount}
      />
      <span className="completed">{completedTaskCount} completed</span>
    </div>
  );
};

export default ProgressBarPresenter;

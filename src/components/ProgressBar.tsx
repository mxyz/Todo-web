import React, { useEffect, useState } from "react";
import "./ProgressBar.scss"; // Import SCSS file for styling

export interface IPropsProgressBar {
  tasksCount: number;
  completedTaskCount: number;
}

const ProgressBar = (props: IPropsProgressBar) => {
  const { tasksCount, completedTaskCount } = props;
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    // Calculate the percentage of completed tasks
    const percentage = (completedTaskCount / tasksCount) * 100;
    setProgressPercentage(percentage);
  }, [completedTaskCount, tasksCount]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

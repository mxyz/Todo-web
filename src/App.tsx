import logo from "./logo.svg";
import "./App.scss";
import useTodos from "./api/useTodos";
import ProgressBarPresenter from "./presenters/ProgressBarPresenter";

function App() {
  const { todoList } = useTodos();
  console.log(todoList);
  return (
    <div className="App">
      <div className="container">
        <ProgressBarPresenter tasksCount={30} completedTaskCount={10} />
      </div>
    </div>
  );
}

export default App;

import React, { useState, useMemo } from "react";
import "./../styles/App.css";

const generateTasks = () => {
  let arr = new Array(50);
  for (let i = 0; i < 50; i++) {
    arr[i] = {
      task: `Todo ${i + 1}`,
      completed: i % 2 == 1,
    };
  }

  return arr;
};

const filterTasks = (filter, tasks) => {
  switch (filter) {
    case "active":
      return tasks.filter((ele) => !ele.completed);
    case "completed":
      return tasks.filter((ele) => ele.completed);
    default:
      return tasks;
  }
};

const TaskList = ({ task }) => {
  return (
    <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
      {task.task}
    </li>
  );
};

const Task = ({ tasks }) => {
  for (let index = 0; index < 1000000000; index++) {}
  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskList task={task} key={index} />
      ))}
    </ul>
  );
};

const App = () => {
  const [tasks, setTasks] = useState(generateTasks());
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  let filteredTasks = useMemo(() => {
    return filterTasks(filter, tasks);
  }, [tasks, filter]);
  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="toggle-button"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <Task tasks={filteredTasks} />
    </div>
  );
};

export default App;

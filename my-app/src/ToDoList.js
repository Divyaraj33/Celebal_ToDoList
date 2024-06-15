import React, { useState, useEffect } from 'react';

const Task = ({ task, index, completeTask, removeTask }) => (
  <div className="task" style={{ textDecoration: task.isCompleted ? "line-through" : "" }}>
    {task.text}
    <div>
      <button onClick={() => completeTask(index)}>Complete</button>
      <button onClick={() => removeTask(index)}>Remove</button>
    </div>
  </div>
);

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    const newTasks = [...tasks, { text: taskInput, isCompleted: false }];
    setTasks(newTasks);
    setTaskInput("");
  };

  const completeTask = index => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "uncompleted") return !task.isCompleted;
    return true;
  });

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={taskInput}
        onChange={e => setTaskInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("uncompleted")}>Uncompleted</button>
      </div>
      <div>
        {filteredTasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            task={task}
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;


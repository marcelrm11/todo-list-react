import React, { useState } from "react";
import CustomInput from "./custom-input.jsx";
import SetList from "./set-list.jsx";

function TodoList({
  data,
  dataLoaded,
  username,
  taskExists,
  userDeleted,
  newTask,
  setNewTask,
  addNewTask,
  deleteTask,
  handleUsername,
}) {
  const [userValue, setUserValue] = useState(username);
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>MY TODO LIST</h1>
      <h4>
        Welcome to your list <span id="username-welcome">{username}</span> !
      </h4>

      <CustomInput
        id="username-input"
        label="Username"
        type="text"
        placeholder="find or create user"
        value={userValue}
        changeAction={(e) => setUserValue(e.target.value)}
        keyAction={(e) => handleUsername(e, userValue)}
      />
      <CustomInput
        id="newtask-input"
        label="New task"
        type="text"
        placeholder="type new task"
        value={newTask}
        changeAction={(e) => setNewTask(e.target.value)}
        keyAction={addNewTask}
      />
      {taskExists && <span>Already in the list!</span>}
      {userDeleted && (
        <span className="text-delete">User {username} was deleted!</span>
      )}
      {dataLoaded || (
        <div className="spinner-border mt-4" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <ul>
        <SetList set={data} itemAction={deleteTask} />
      </ul>
      <p>
        <span id="tasks-left">
          {data.length || "no"} {data.length === 1 ? "task" : "tasks"} in the
          list.
        </span>
      </p>
    </div>
  );
}

export default TodoList;

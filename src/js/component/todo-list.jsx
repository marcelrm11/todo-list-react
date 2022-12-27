import React from "react";
import CustomInput from "./custom-input.jsx";
import SetList from "./set-list.jsx";

function TodoList({
  username,
  setUsername,
  newTask,
  setNewTask,
  addNewTask,
  hasTask,
  userDeleted,
  errorMsg,
  taskList,
  deleteTask,
  handleUsername,
}) {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>MY TODO LIST</h1>
      <CustomInput
        type="text"
        placeholder="find or create user"
        value={username}
        changeAction={(e) => setUsername(e.target.value)}
        keyAction={(e) => handleUsername(e.key)}
      />
      <h4>Welcome {username} to your list!</h4>
      <CustomInput
        type="text"
        placeholder="add new task"
        value={newTask}
        changeAction={(e) => setNewTask(e.target.value)}
        keyAction={(e) => addNewTask(e.key)}
      />
      {hasTask && <span>Already in the list!</span>}
      {userDeleted && (
        <span className="text-delete">User {username} was deleted!</span>
      )}
      <h6 className="text-error">{errorMsg}</h6>
      <ul>
        <SetList set={taskList} itemAction={(e) => deleteTask(e)} />
      </ul>
      <p>
        {taskList.length || "no"} {taskList.length === 1 ? "task" : "tasks"} in
        the list.
      </p>
    </div>
  );
}

export default TodoList;

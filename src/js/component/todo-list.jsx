import React from "react";
import CustomInput from "./custom-input.jsx";
import SetList from "./set-list.jsx";

function TodoList({ props }) {
  return (
    <div className="container d-flex flex-column align-items-center">
      <h1>MY TODO LIST</h1>
      <CustomInput
        type="text"
        placeholder="find or create user"
        value={props.username}
        changeAction={(e) => props.setUsername(e.target.value)}
        keyAction={(e) => props.handleUsername(e.key)}
      />
      <h4>Welcome {props.username} to your list!</h4>
      <CustomInput
        type="text"
        placeholder="add new task"
        value={props.newTask}
        changeAction={(e) => props.setNewTask(e.target.value)}
        keyAction={(e) => props.addNewTask(e.key)}
      />
      {props.hasTask && <span>Already in the list!</span>}
      {props.userDeleted && (
        <span className="text-delete">User {props.username} was deleted!</span>
      )}
      <h6 className="text-error">{props.errorMsg}</h6>
      <ul>
        <SetList set={props.taskList} itemAction={(e) => props.deleteTask(e)} />
      </ul>
      <p>
        {props.taskList.size} {props.taskList.size === 1 ? "task" : "tasks"} in
        the list.
      </p>
    </div>
  );
}

export default TodoList;

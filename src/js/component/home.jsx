import React, { useState } from "react";

import TodoList from "./todo-list.jsx";

function Home() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState(new Set());
  const [hasTask, setHasTask] = useState(false);
  const [username, setUsername] = useState("");
  const [userDeleted, setUserDeleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [myUsersList, setUsersList] = useState(new Set());

  const myProps = {
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
  };

  function handleUsername(key) {
    if (key == "Enter") {
      createUser(username); // this creates (POST) and GETs the list
    }
  }

  function addNewTask(key) {
    if (key == "Enter") {
      let exists;
      for (const taskObj of taskList) {
        if (taskObj.label === newTask) {
          exists = true;
          break;
        }
      }
      let newTaskObj = { label: newTask, done: false };
      setHasTask(exists);
      if (!exists) {
        let newTaskList = taskList.add(newTaskObj);
        setTaskList(newTaskList);
        updateApiList(username, newTaskList);
      }
      setNewTask("");
    }
  }

  function deleteTask(e) {
    let taskLabel = e.target.parentElement.textContent;
    let newTaskList = new Set(taskList);
    for (const taskObj of newTaskList) {
      if (taskObj.label === taskLabel) {
        // could be improved with trim and case insensitivity
        newTaskList.delete(taskObj);
        break;
      }
    }
    if (newTaskList.size === 0) {
      deleteUser(username); // list cannot be empty
      setUserDeleted(true);
      setTimeout(() => {
        setUserDeleted(false);
        setUsername("");
      }, 3000);
    } else {
      updateApiList(username, newTaskList);
    }
    setTaskList(newTaskList);
  }

  async function createUser(username) {
    try {
      await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/${username}`,
        {
          method: "POST",
          body: "[]",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
    } finally {
      getUserTodoList(username);
    }
  }

  async function getUserTodoList(username) {
    try {
      let response = await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/${username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      let myTaskList = new Set();
      for (const task of data) {
        myTaskList.add(task);
      }
      setTaskList(myTaskList);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateApiList(username, newList) {
    try {
      await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/${username}`,
        {
          method: "PUT",
          body: JSON.stringify([...newList]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteUser(username) {
    try {
      await fetch(
        `https://assets.breatheco.de/apis/fake/todos/user/${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <TodoList {...myProps} />
    </div>
  );
}

export default Home;

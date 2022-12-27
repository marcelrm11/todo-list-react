import React, { useEffect, useState } from "react";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../api/api.js";
import TodoList from "./todo-list.jsx";

function Home() {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [hasTask, setHasTask] = useState(false);
  const [username, setUsername] = useState("marcelrm11");
  const [userDeleted, setUserDeleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [myUsersList, setUsersList] = useState(new Set());

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

  useEffect(() => {
    createAndGet(username);
  }, []);

  const createAndGet = async (username) => {
    let allUsers = await getAllUsers();
    if (!allUsers.includes(username)) {
      await createUser(username);
    }
    setTaskList(await getUser(username));
  };

  async function handleUsername(key) {
    if (key == "Enter") {
      await createAndGet(username);
    }
  }

  function addNewTask(key) {
    if (key == "Enter") {
      let exists;
      for (const taskObj of taskList) {
        if (
          taskObj.label.toLowerCase().trim() === newTask.toLowerCase().trim()
        ) {
          exists = true;
          break;
        }
      }
      let newTaskObj = { label: newTask, done: false };
      setHasTask(exists);
      if (!exists) {
        let newTaskList = taskList.concat(newTaskObj);
        setTaskList(newTaskList);
        updateApiList(username, newTaskList);
      }
      setNewTask("");
    }
  }

  function deleteTask(e) {
    let taskLabel = e.target.parentElement.textContent;
    let newTaskList = taskList.slice();
    for (let i = 0; i < newTaskList.length; i++) {
      if (
        newTaskList[i].label.toLowerCase().trim() ===
        taskLabel.toLowerCase().trim()
      ) {
        newTaskList.splice(i, 1);
        break;
      }
    }
    if (newTaskList.length === 0) {
      doDeleteUser(username); // list cannot be empty
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

  function updateApiList(username, newList) {
    try {
      updateUser(username, newList);
    } catch (error) {
      console.log(error);
    }
  }

  function doDeleteUser(username) {
    try {
      deleteUser(username);
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

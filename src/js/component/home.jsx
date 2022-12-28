import React, { useEffect, useReducer, useState } from "react";
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

  const tasksReducer = (state, action) => {
    switch (action.type) {
      case "SET_USER":
        return {
          ...state,
          data: [],
          userDeleted: false,
          username: action.payload,
        };
      case "GET_TASKS":
        return {
          ...state,
          data: action.payload, // task list from server
          dataLoaded: true,
        };
      case "ADD_TASK":
        return {
          ...state,
          data: action.payload, // the new task list
          taskExists: false,
        };
      case "REMOVE_TASK":
        return {
          ...state,
          data: state.data.filter(
            (task) => task.label.toLowerCase().trim() !== action.payload
          ),
        };
      case "TASK_EXISTS":
        return {
          ...state,
          taskExists: true,
        };
      case "DELETE_USER":
        doDeleteUser(state.username);
        return {
          ...state,
          username: "",
          userDeleted: true,
        };
      case "LOADING":
        return {
          ...state,
          dataLoaded: false,
        };
    }
  };

  // * 0 | INITIAL STATE
  const [taskList, dispatchTasks] = useReducer(tasksReducer, {
    data: [],
    username: "marcelrm11",
    dataLoaded: false,
    taskExists: false,
    userDeleted: false,
  });

  // * Update server on change
  useEffect(async () => {
    if (taskList.dataLoaded) {
      try {
        // * 4 | DELETE USER WHEN REMOVE LAST TASK
        if (taskList.data.length === 0) {
          dispatchTasks({ type: "DELETE_USER" });
        } else {
          await updateUser(taskList.username, taskList.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [taskList.data]);

  // * 1 | CREATE AND/OR GET
  const createAndGet = async (username) => {
    dispatchTasks({ type: "LOADING" });
    // check if user already exists
    const allUsers = await getAllUsers();
    if (!allUsers.includes(username)) {
      await createUser(username); // Server
    }
    const tasks = await getUser(username); // Server
    dispatchTasks({ type: "GET_TASKS", payload: tasks }); // State
  };
  // on first render
  useEffect(() => {
    createUser(taskList.username); // I was having problems from time to time, my user being in users but not being able to GET
    createAndGet(taskList.username);
  }, []);
  // on user change
  async function handleUsername(e, username) {
    if (e.key == "Enter") {
      dispatchTasks({ type: "SET_USER", payload: username });
      await createAndGet(username);
    }
  }

  // * 2 | ADD TASK
  const addNewTask = async (e) => {
    if (e.key == "Enter") {
      // check if the task already exists
      for (const taskObj of taskList.data) {
        if (
          taskObj.label.toLowerCase().trim() === newTask.toLowerCase().trim()
        ) {
          dispatchTasks({ type: "TASK_EXISTS" });
          break;
        }
      }
      if (!taskList.taskExists) {
        let newTaskObj = { label: newTask, done: false };
        dispatchTasks({
          type: "ADD_TASK",
          payload: taskList.data.concat(newTaskObj),
        });
      }
      setNewTask("");
    }
  };

  // * 3 | REMOVE TASK
  const deleteTask = (e) => {
    let taskLabel = e.target.parentElement.textContent;
    dispatchTasks({
      type: "REMOVE_TASK",
      payload: taskLabel.toLowerCase().trim(),
    });
  };

  function doDeleteUser(username) {
    try {
      deleteUser(username);
    } catch (error) {
      console.log(error);
    }
  }

  const myProps = {
    newTask,
    setNewTask,
    addNewTask,
    deleteTask,
    handleUsername,
  };

  return (
    <div>
      <TodoList {...taskList} {...myProps} />
    </div>
  );
}

export default Home;

import React, { useState } from "react";
import CustomInput from "./custom-input.jsx";
import SetList from "./set-list.jsx";

function TodoList() {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState(new Set());
    const [hasTask, setHasTask] = useState(false);
    const [username, setUsername] = useState("");
    const [userDeleted, setUserDeleted] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [myUsersList, setUsersList] = useState(new Set());

    function handleUsername(key) {
        if (key == "Enter"){
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
            let newTaskObj = {label: newTask, done: false}
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
            let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
                method: "POST",
                body: "[]",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log(response);
            let data = await response.json()
            // if (!response.ok) setErrorMsg(data.msg)
            console.log(data);
        } catch(error) {
            console.log(error);
            setErrorMsg(error);
        } finally {
            getUserTodoList(username);
        }
    }

    async function getUserTodoList(username) {
        try {
            let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let data = await response.json();
            console.log(data)
            let myTaskList = new Set();
            for (const task of data) {
                myTaskList.add(task);
            }
            setTaskList(myTaskList);
        } catch(error) {
            console.log(error);
        }

    }

    async function updateApiList(username, newList) {
        try {
            let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
                method: "PUT",
                body: JSON.stringify([...newList]),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let data = await response.json();
            console.log(data);
        } catch(error) {
            console.log(error);
        }
    }

    async function deleteUser(username) {
        try {
            await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>MY TODO LIST</h1>

            <CustomInput 
                type={"text"}
                placeholder={"find or create user"}
                value={username}
                onChange={setUsername}
                onKeyDown={handleUsername}
            />

            <h4>Welcome {username} to your list!</h4>

            <CustomInput
                type={"text"}
                placeholder={"add new task"}
                value={newTask}
                onChange={setNewTask}
                onKeyDown={addNewTask}
            />
            
            {hasTask ? <span>Already in the list!</span> : ""}
            {userDeleted ? <span className="text-delete">User {username} was deleted!</span> : ""}
            <h6 className="text-error">{errorMsg}</h6>

            <ul>
                <SetList 
                    set={taskList} 
                    itemAction={deleteTask}
                />
            </ul>

            <p>{taskList.size}{' '}{taskList.size === 1 ? "task" : "tasks"} in the list.</p>
        </div>
    )
}

export default TodoList;
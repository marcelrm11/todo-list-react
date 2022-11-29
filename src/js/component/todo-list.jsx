import React, { useState } from "react";
import CustomInput from "./custom-input.jsx";
import SetList from "./set-list.jsx";

function TodoList() {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState(new Set());
    const [hasTask, setHasTask] = useState(false);
    const [username, setUsername] = useState("");
    const [myUsersList, setUsersList] = useState(new Set());

    function handleUsername(key) {
        if (key == "Enter"){
            createUser(username); // this creates (POST) and GETs the list
        }
    }

    function handleEnter(key) {
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
            deleteUser(username);
        } else {
            updateApiList(username, newTaskList);
        }
        setTaskList(newTaskList);
    }

    async function createUser(username) {
        let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "POST",
            body: "[]",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await response.json()
        console.log(data);
        getUserTodoList(username);
        // .catch(error => console.log(error));
    }

    async function getUserTodoList(username) {
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
    }

    function updateApiList(username, newList) {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "PUT",
            body: JSON.stringify([...newList]),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => console.log(data.result))
        .catch(error => console.log(error))
    }

    function deleteUser(username) {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>MY TODO LIST</h1>

            <CustomInput 
                type={"text"}
                placeholder={"username"}
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
                onKeyDown={handleEnter}
            />
            
            {hasTask ? <span>Already in the list!</span> : ""}

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
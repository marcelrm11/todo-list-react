import React, { useEffect, useState } from "react";

function TodoList() {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState(new Set());
    const [hasTask, setHasTask] = useState(false);

    useEffect(() => {
        console.log("useEffect createUser!");
        createUser("marcelrm11"); // creates the user and the todo list in the server
    }, []); // run an effect and clean it up only once

    useEffect(() => {
        console.log("useEffect getTodos!");
        getUserTodoList("marcelrm11");
    })

    function handleEnter(key) {
        if (key == "Enter") {
            setHasTask(taskList.has(newTask))
            let newTaskList = taskList.add(newTask);
            setTaskList(newTaskList);
            setNewTask("");
            updateApiList("marcelrm11", apiListFromSet(newTaskList));
        }
    }

    function deleteTask(e) {
        let toBeDeleted = e.target.parentElement.textContent;
        let newTaskList = new Set(taskList);
        newTaskList.delete(toBeDeleted);
        setTaskList(newTaskList);
        updateApiList("marcelrm11", apiListFromSet(newTaskList));
    }

    function apiListFromSet(mySet) {
        let apiList = [];
        for (let task of mySet) {
            const taskObj = { label: task, done: false};
            apiList.push(taskObj);
        }
        return apiList;
    }

    function createUser(username) {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "POST",
            body: "[]",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            console.log(response.status);
            return response.json();
        })
        .then(data => {
            console.log(data.msg);
        })
        .catch(error => console.log(error));
    }

    function getUserTodoList(username) {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    function updateApiList(username, newList) {
        fetch(`https://assets.breatheco.de/apis/fake/todos/user/${username}`, {
            method: "PUT",
            body: JSON.stringify(newList),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } 

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>MY TODO LIST</h1>
            <input type="text" placeholder="add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => handleEnter(e.key)}
            />{hasTask ? <span>Already in the list!</span> : ""}
            <ul>
                {[...taskList].map((task, index) => {
                    return (
                        <li className="task" key={index}>
                            {task} 
                            <i className="fa-solid fa-trash-can delete"
                            onClick={(e) => deleteTask(e)}
                            ></i>
                        </li>
                    )
                })}
            </ul>
            <p>{taskList.size}{' '}{taskList.size === 1 ? "task" : "tasks"} in the list.</p>
        </div>
    )
}

export default TodoList;
import React, { useState } from "react";

function TodoList() {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState(new Set());

    function handleEnter(key) {
        if (key == "Enter") {
            let newTaskList = taskList.add(newTask);
            setTaskList(newTaskList);
            setNewTask("");
        }
    }

    function deleteTask(e) {
        let toBeDeleted = e.target.parentElement.textContent;
        let newTaskList = new Set(taskList);
        newTaskList.delete(toBeDeleted);
        setTaskList(newTaskList);
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>MY TODO LIST</h1>
            <input type="text" placeholder="add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => handleEnter(e.key)}
            />
            <ul>
                {[...taskList].map((task, index) => {
                    return (
                        <li className="task" key={index}>
                            {task} 
                            <i className="fa-solid fa-trash-can"
                            onClick={(e) => deleteTask(e)}
                            ></i>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TodoList;
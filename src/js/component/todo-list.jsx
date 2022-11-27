import React, { useState } from "react";

function TodoList() {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    function handleEnter(key) {
        if (key == "Enter") {
            setTaskList(taskList.concat(newTask));
            setNewTask("");
        }
    }

    return (
        <div className="container d-flex flex-column align-items-center">
            <h1>MY TODO LIST</h1>
            <input type="text" placeholder="add new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => handleEnter(e.key)}
            />
            <ul>{taskList.map((task, index) => {
                return (
                    <li className="task" key={index}>
                        {task} <i className="fa-solid fa-trash-can"></i>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TodoList;
import React from "react";
import DeleteItem from "./delete-item.jsx";

function SetList(props) {

    return (
        [...props.set].map((task, index) => {
            return (
                <li className="task" key={index}>
                    {task.label} 
                    <DeleteItem 
                        onClick={props.itemAction} 
                        iconClass={"fa-solid fa-trash-can delete"}
                    />
                </li>
            );
        })
    );
}

export default SetList;
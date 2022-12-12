import React from "react";
import DeleteItem from "./delete-item.jsx";

// this is an array of <li> elements from a Set.
function SetList({ set, itemAction }) {
  return [...set].map((task, index) => {
    return (
      <li className="task" key={index}>
        {task.label}
        <DeleteItem
          handleClick={itemAction}
          iconClass={"fa-solid fa-trash-can delete"}
        />
      </li>
    );
  });
}

export default SetList;

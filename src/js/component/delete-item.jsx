import React from "react";

function DeleteItem(props) {
    function handleClick(e) {
        props.onClick(e);
    }
    return (
        <i className={props.iconClass}
            onClick={(e) => handleClick(e)}
        ></i>
    )
}

export default DeleteItem;
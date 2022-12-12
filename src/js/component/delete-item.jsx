import React from "react";

function DeleteItem({ iconClass, handleClick }) {
  return <i className={iconClass} onClick={handleClick}></i>;
}

export default DeleteItem;

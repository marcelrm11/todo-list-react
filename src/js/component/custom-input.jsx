import React from "react";

function CustomInput(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.changeAction}
      onKeyDown={props.keyAction}
    />
  );
}

export default CustomInput;

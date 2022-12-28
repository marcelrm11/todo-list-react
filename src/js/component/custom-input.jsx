import React from "react";

function CustomInput(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.changeAction}
        onKeyDown={props.keyAction}
      />
    </>
  );
}

export default CustomInput;

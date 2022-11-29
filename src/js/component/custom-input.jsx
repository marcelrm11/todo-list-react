import React from "react";

function CustomInput(props) {
    function handleKey(key) {
        props.onKeyDown(key)
    }
    function handleChange(value) {
        props.onChange(value);
    }
    return (
        <input 
            type={props.type} 
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => handleKey(e.key)}
        />
    )
}

export default CustomInput;
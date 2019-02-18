import React from 'react';
import './Button.css';

function Btn({typeStr, children, ...rest}) {
    const newClass = "btn " + typeStr;
    return <button {...rest} className={newClass}>{children}</button>
}

function Button({type, children, ...rest}) {
    return (
        <Btn {...rest} typeStr={type}>{children}</Btn>
    )
}

export default Button;
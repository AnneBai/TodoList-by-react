import React from 'react';
import './Input.css';

// 支持回车键确认
function Input({handleConfirm, ...rest}) {
    return (
        <input
            {...rest}
            className="input"
            type="text"
            onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    return handleConfirm();
                }
                return;
            }}
        />
    )
}

export default Input;
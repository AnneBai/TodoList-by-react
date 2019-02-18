import React from 'react';
import './Checkbox.css';

function Checkbox({checked, ...rest}) {
    return checked ? (
        <span
            {...rest}
            className="_checkbox"
        >&radic;</span>
    ) : (
        <span {...rest} className="_checkbox"></span>
    );
}

export default Checkbox;
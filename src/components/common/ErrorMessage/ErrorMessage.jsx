import React from "react";

import './ErrorMessge.scss'

const ErrorMessage = (props) => {
    return (
        <div className={`${props.className} field-error`}>{props.children}</div>
    )
}

export default ErrorMessage
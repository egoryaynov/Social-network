import React from "react";

import style from './ErrorMessge.module.scss';

const ErrorMessage = (props) => {
    return (
        <div className={`${props.className} ${style.fieldError}`}>{props.children}</div>
    )
}


export default ErrorMessage
import React from "react";

import style from './ErrorMessge.module.scss';

type PropsType = {
    className: string
}
const ErrorMessage: React.FC<PropsType> = (props, {className}) => {
    return (
        <div className={`${className} ${style.fieldError}`}>
            {props.children}
        </div>
    )
}


export default ErrorMessage
import React, {useState, useEffect} from 'react';
import style from './ProfileStatus.module.scss';

const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEdit = () => {
        setEditMode(true);
    }
    const deactivateEdit = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const changeStatus = (newStatus) => {
        setStatus(newStatus)
    }

    return (
        <div>
            {editMode
                ? <input autoFocus={true}
                         onChange={(event) => changeStatus(event.currentTarget.value)}
                         onBlur={deactivateEdit}
                         type="text"
                         value={status}/>
                : <div className={style.status}
                       onClick={activateEdit}>{status || '*Click to change status*'}</div>}
        </div>
    );
}

export default ProfileStatus;

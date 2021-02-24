import React, {useState, useEffect} from 'react';
import style from './ProfileStatus.module.scss';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
const ProfileStatus: React.FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState<string>(props.status);

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

    const changeStatus = (newStatus: string) => {
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

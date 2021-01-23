import React, {useState, useEffect} from 'react';

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
        <>
            {editMode
                ? <input autoFocus={true}
                         onChange={(event) => changeStatus(event.currentTarget.value)}
                         onBlur={deactivateEdit}
                         type="text"
                         value={status}/>
                : <div className="profile__status"
                       onClick={activateEdit}>{status || 'aaaaaaaaaaaaaaaaaaaaaa'}</div>}
        </>
    );
}

export default ProfileStatus;

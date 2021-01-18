import React, {Component} from 'react';

class ProfileStatus extends Component {
    state = {
        editMode: false
    }

    onEditStatus = () => {
        this.setState({
            editMode: !this.state.editMode
        })
    }

    render() {
        return (
            <>
                {this.state.editMode
                    ? <input autoFocus={true} onBlur={this.onEditStatus} type="text" value={this.props.status}/>
                    : <div className="profile__description"
                           onClick={this.onEditStatus}>{this.props.status}</div>}
            </>
        );
    }
}


export default ProfileStatus;

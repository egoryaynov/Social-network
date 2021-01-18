import React, {Component} from 'react';

class ProfileStatus extends Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEdit = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEdit = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    changeStatus(status) {
        this.setState({
            status: status
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.status !== prevProps.status) {
            this.setState({
                status: prevProps.status
            })
        }
    }

    render() {
        return (
            <>
                {this.state.editMode
                    ? <input autoFocus={true}
                             onChange={(event) => this.changeStatus(event.currentTarget.value)}
                             onBlur={this.deactivateEdit}
                             type="text"
                             value={this.state.status}/>
                    : <div className="profile__status"
                           onClick={this.activateEdit}>{this.props.status || 'aaaaaaaaaaaaaaaaaaaaaa'}</div>}
            </>
        );
    }
}


export default ProfileStatus;

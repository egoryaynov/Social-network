import {Route} from 'react-router-dom';

import HeaderContainer from "./components/Header/HeaderContainer";
import Aside from "./components/Aside/Aside";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import ProfileContainer from "./components/profile/ProfileContainer";

function App() {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <div className="content-wrapper">
                <Aside/>
                <Route path='/dialogs' render={() =>
                    <DialogsContainer/>
                }/>
                <Route path='/profile/:userID?' render={() =>
                    <ProfileContainer/>
                }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
                <Route path='/users' render={() =>
                    <UsersContainer/>
                }/>
            </div>
        </div>
    );
}

export default App;

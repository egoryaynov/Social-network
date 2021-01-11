import {Route} from 'react-router-dom';

import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Profile from "./components/profile/Profile";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <div className="content-wrapper">
                <Aside/>
                <Route path='/dialogs' render={() =>
                    <DialogsContainer/>
                }/>
                <Route path='/profile' render={() =>
                    <Profile/>
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

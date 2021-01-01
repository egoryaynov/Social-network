import {Route} from 'react-router-dom';

import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";

import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Profile from "./components/profile/Profile";

function App({store}) {
    return (
        <div className='app-wrapper'>
            <Header/>
            <div className="content-wrapper">
                <Aside state={store.getState().sideBar}/>
                <Route path='/dialogs' render={() =>
                    <DialogsContainer store={store}/>
                }/>
                <Route path='/profile' render={() =>
                    <Profile store={store}/>
                }/>
                <Route path='/news' component={News}/>
                <Route path='/music' component={Music}/>
                <Route path='/settings' component={Settings}/>
                <Route path='/friends' component={Friends}/>
            </div>
        </div>
    );
}

export default App;

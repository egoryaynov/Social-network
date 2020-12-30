import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Friends from "./components/Friends/Friends";

import {Route} from 'react-router-dom';

function App({state, addPost, updatePostText, addMessage, updateMessage}) {
    return (
        <div className='app-wrapper'>
            <Header/>
            <div className="content-wrapper">
                <Aside state={state.sideBar}/>
                <Route path='/dialogs' render={() =>
                    <Dialogs state={state.dialogsPage}
                             addMessage={addMessage}
                             updateMessage={updateMessage}
                    />
                }/>
                <Route path='/profile' render={() =>
                    <Profile state={state.profilePage}
                             addPost={addPost}
                             updatePostText={updatePostText}
                    />
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

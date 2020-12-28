import Header from "./components/Header/Header";
import Aside from "./components/Aside/Aside";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";

import {BrowserRouter as Router, Route} from "react-router-dom";

// IMPORT BUSINESS LOGIC
import {dataDialogs, dataMessages, dataPosts} from "./index";

function App() {
    return (
        <Router>
            <div className='app-wrapper'>
                <Header/>
                <div className="content-wrapper">
                    <Aside/>
                    <Route path='/dialogs'
                           render={() => <Dialogs dataDialogs={dataDialogs} dataMessages={dataMessages}/>}/>
                    <Route path='/profile' render={() => <Profile dataPosts={dataPosts}/>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                </div>
            </div>
        </Router>
    );
}

export default App;

import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initialize} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import PageNotFound from "./components/common/PageNotFound/PageNotFound";
import {getInitialized} from "./redux/selectors/appSelectors";
import Header from './components/Header/Header';
import {Container} from "@material-ui/core";

let ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
let ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage'));
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChatPage = withSuspense(ChatPage);

const App: React.FC = () => {
    const initialized = useSelector(getInitialized)
    const dispatch = useDispatch()

    React.useEffect(() => {
        const init = () => {
            dispatch(initialize())
        }

        init()
    }, [])

    if (!initialized) return <Preloader/>

    return (
        <div>
            <Header/>
            <Container style={{marginTop: '25px'}}>
                <Switch>
                    <Redirect exact from='/' to='/profile'/>

                    <Route path='/dialogs' render={() =>
                        <DialogsContainer/>
                    }/>
                    <Route path='/profile/:profileUserId?' render={() =>
                        <SuspendedProfile/>
                    }/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/users/:page?' render={() =>
                        <UsersContainer/>
                    }/>
                    <Route path='/chat' render={() =>
                        <SuspendedChatPage/>
                    }/>
                    <Route path='/login' render={() =>
                        <Login/>
                    }/>

                    <Route path='' render={() => <PageNotFound/>}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
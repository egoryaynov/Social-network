import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import HeaderContainer from "./components/Header/HeaderContainer";
import Aside from "./components/Aside/Aside";
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

let ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const SuspendedProfile = withSuspense(ProfileContainer);

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
            <HeaderContainer/>
            <div className="content-wrapper">
                <Aside/>

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
                    <Route path='/login' render={() =>
                        <Login/>
                    }/>

                    <Route path='' render={() => <PageNotFound/>}/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
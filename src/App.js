import Header from "./components/header/Header";
import Aside from "./components/aside/Aside";
import Profile from "./components/profile/Profile";

function App() {
    return (
        <div className='app-wrapper'>
            <Header/>
            <div className="content-wrapper">
                <Aside/>
                <Profile/>
            </div>
        </div>
    );
}

export default App;

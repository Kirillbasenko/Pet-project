import MainPage from "../mainPage/MainPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import SinglePhoto from "../singlePhoto/SinglePhoto";
import Favorites from "../favorites/Favorites";
import CreateElem from "../createElem/CreateElem";
import LoginPage from "../loginPage/LoginPage";
import RegisterPage from "../registerPage/RegisterPage";

const App = () => {
    return(
        <Router>
            <AppHeader/>
            <Routes>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/create" element={<CreateElem/>}/>
                <Route path="/:photoId" element={<SinglePhoto/>}/>
                <Route path="/favorit" element={<Favorites/>}/>
            </Routes>
        </Router>
    )
    
}

export default App;
import MainPage from "../mainPage/MainPage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import SinglePhoto from "../singlePhoto/SinglePhoto";
import Favorites from "../favorites/Favorites";

const App = () => {

    return(
        <Router>
            <AppHeader/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/:photoId" element={<SinglePhoto/>}/>
                <Route path="/favorit" element={<Favorites/>}/>
            </Routes>
        </Router>
    )
    
}

export default App;
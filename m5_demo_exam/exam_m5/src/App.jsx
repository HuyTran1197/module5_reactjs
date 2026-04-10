import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router";
import List from "./component/List.jsx";
import Home from "./component/Home.jsx";
import HeaderComponent from "./component/Header.jsx";
import AddMusic from "./component/AddMusic.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/music'} element={<List/>}/>
                <Route path={'/music/add'} element={<AddMusic/>}/>
            </Routes>

            <ToastContainer/>
        </>


    )
}

export default App;

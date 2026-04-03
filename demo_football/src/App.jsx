import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import FootballList from "./component/FootballList.jsx";
import {Route, Routes} from "react-router";
import Home from "./component/Home.jsx";
import AddPlayer from "./component/AddPlayer.jsx";
import {ToastContainer} from "react-toastify";
import HeaderComponent from "./component/Header.jsx";
import Detail from "./component/Detail.jsx";
import EditPlayer from "./component/EditPlayer.jsx";

function App() {

    return (
        <>
            <HeaderComponent/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/football'} element={<FootballList/>}/>
                <Route path={'/football/add'} element={<AddPlayer/>}/>
                <Route path={'/football/edit/:id'} element={<EditPlayer/>}/>
                <Route path={'/football/detail/:id'} element={<Detail/>}/>
            </Routes>
            <ToastContainer/>

        </>
    )
}

export default App

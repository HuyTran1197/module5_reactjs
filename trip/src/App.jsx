import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import {Route, Routes} from "react-router";
import List from "./component/List.jsx";
import Detail from "./component/Detail.jsx";

function App() {

    return (
        <>
            <Routes>
                <Route path={'/'} element={<List/>}/>
                <Route path={'/detail/:id'} element={<Detail/>}/>
            </Routes>
        </>
    )
}

export default App

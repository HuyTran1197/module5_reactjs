import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import AppTodo from "./class_component/AppTodo.jsx";
import List from "./component/List.jsx";
import FootballList from "./component/FootballList.jsx";

function App() {

    return (
        <>
            <AppTodo/>
            <hr/>
            <h1>Customer List</h1>
            <List/>
            <hr/>
            <h1>Player List</h1>
            <FootballList/>

        </>
    )
}

export default App

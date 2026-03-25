import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import './App.css'
import CustomerListComponent from "./class_component/CustomerListComponent.jsx";
import AppTodo from "./class_component/AppTodo.jsx";

function App() {

    return (
        <>
            <AppTodo/>
            <hr/>
            <h1>Customer List</h1>
            <CustomerListComponent/>

        </>
    )
}

export default App

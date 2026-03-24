import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import cities from "./component/example1.jsx";
import CUSTOMER from "./component/example2.jsx";

function App() {

    return (
        <>
            <h1>Hello Việt Nam !!!</h1>
            {cities}
            <hr/>
            <h1>Customer List</h1>
            <CUSTOMER/>
        </>
    )
}

export default App

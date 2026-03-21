import './App.css'
import './index.css'
import {getAll} from "./service/StudentService.js";
import HEADERCOMPONENT from "./component/header.jsx";
import FOOTERCOMPONENT from "./component/footer.jsx";

function App() {
    return (
        <>
            <HEADERCOMPONENT/>
            <hr/>
            <h1>Students</h1>
            <table>
                <thead>
                 <tr>
                     <th>Company</th>
                     <th>Contract</th>
                     <th>Country</th>
                 </tr>
                </thead>
                <tbody>
                {getAll().map(s =>(
                    <tr>
                        <td>{s.company}</td>
                        <td>{s.contact}</td>
                        <td>{s.country}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <hr/>
            <FOOTERCOMPONENT/>
        </>
    )
}

export default App

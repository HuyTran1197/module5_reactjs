import { useState, useEffect } from "react";
import './App.css'
import './index.css'

function App() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Format gọn: hh:mm:ss
    const TimeString = currentTime.toLocaleTimeString(); // ví dụ: 10:15:30
    const DateString = currentTime.toLocaleDateString();

    const STUDENTS = [
        {
            company: 'Alfreds Futterkiste',
            contact: 'Maria Anders',
            country: 'Germany'
        },
        {
            company: 'Centro comercial Moctezuma',
            contact: 'Francisco Chang',
            country: 'Mexico'
        },
        {
            company: 'Ernst Handel',
            contact: 'Roland Mendel',
            country: 'Austria'
        },
        {
            company: 'Island Trading',
            contact: 'Helen Bennett',
            country: 'UK'
        },
        {
            company: 'Laughing Bacchus Winecellars',
            contact: 'Yoshi Tannamuri',
            country: 'Canada'
        },
        {
            company: 'Magazzini Alimentari Riuniti',
            contact: 'Giovanni Rovelli',
            country: 'Italy'
        }
    ]

    return (
        <>
            <h1>It is {DateString} - {TimeString}.</h1>
            <div className="container">
                <div className="card">
                    <div className="card--header" />
                    <img
                        className="avatar"
                        src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="avatar"
                    />
                    <div className="card--body">
                        <div>
                            <p className="text-header">Huy Goonch</p>
                            <p className="text-sub">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry
                            </p>
                            <button className="btn third">FOLLOW</button>
                        </div>
                    </div>
                </div>
            </div>
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
                {STUDENTS.map(s =>(
                    <tr>
                        <td>{s.company}</td>
                        <td>{s.contact}</td>
                        <td>{s.country}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <hr/>
            <div className="container d-flex align-items-center text-center">
                <div className="form-signin">
                    <form>
                        <img className="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap logo" width="72" height="57" />
                        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control email" id="floatingInput" placeholder="name@example.com" />
                            <label>Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control password" id="floatingPassword" placeholder="Password" />
                            <label>Password</label>
                        </div>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" /> Remember me
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default App

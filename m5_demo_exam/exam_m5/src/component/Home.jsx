import {Link} from "react-router";

const Home = () => {
    return(
        <>
            <div>
                <h1>Home</h1>
                <ul>
                    <li><Link to={'/music'}>Sportify</Link></li>
                </ul>
            </div>
        </>
    )
}
export default Home ;
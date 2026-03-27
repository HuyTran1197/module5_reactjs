import {Link} from "react-router";

const Home = () => {
    return(
        <>
            <div>
                <h1>Home</h1>
                <ul>
                    <li><Link to={'/football'}>Football</Link></li>
                    <li><Link to={'/todo'}>Todo app</Link></li>
                    <li><Link to={'/customer'}>Customer List</Link></li>
                </ul>
            </div>
        </>
    )
}
export default Home ;
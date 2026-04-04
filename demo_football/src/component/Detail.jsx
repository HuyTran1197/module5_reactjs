// import {useEffect, useState} from "react";
// import {useParams} from "react-router";
// import {findById} from "../service/FootballPlayerService.js";
//
// const Detail = () => {
//     const [player,setPlayer] = useState([]);
//     const {id} = useParams();
//     useEffect(() => {
//         const fetData = async () => {
//             setPlayer(await findById(id));
//         }
//         fetData()
//     }, [id]);
//     return(
//         <>
//             <h1>Player View</h1>
//             <p>Id: <span><b>{player?.id}</b></span></p>
//             <p>Player Code: <span><b>{player?.playerCode}</b></span></p>
//             <p>Name: <span><b>{player?.name}</b></span></p>
//             <p>Birthday: <span><b>{player?.birthday}</b></span></p>
//             <p>Transfer: <span><b>{player?.transfer}</b></span></p>
//             <p>Position: <span><b>{player.position?.name}</b></span></p>
//         </>
//     )
// }
//
// export default Detail;

import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {findById} from "../service/FootballPlayerService.js";

const Detail = () => {
    const [player,setPlayer] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const fetData = async () => {
            setPlayer(await findById(id));
        }
        fetData();
    }, []);
    return(
        <>
            <h1>Player View</h1>
            <p>ID: <span><b>{player?.id}</b></span></p>
            <p>Player code: <span><b>{player?.playerCode}</b></span></p>
            <p>Name: <span><b>{player?.name}</b></span></p>
            <p>Birthday: <span><b>{player?.birthday}</b></span></p>
            <p>Transfer: <span><b>{player?.transfer}</b></span></p>
            <p>Position: <span><b>{player.position?.name}</b></span></p>
        </>
    )
}

export default Detail;
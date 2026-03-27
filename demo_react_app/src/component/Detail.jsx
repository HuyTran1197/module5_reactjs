import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {findById} from "../service/FootbalPlayerService.js";

const Detail = () => {
    const [player,setPlayer] = useState({});
    const {id} = useParams();

    useEffect(() => {
        setPlayer(findById(id))
    }, []);

    return(
        <>
            <h2>Player View</h2>
            <div>
                <p>ID:{player?.id} </p>
                <p>Player Id:{player?.playerId} </p>
                <p>Name:{player?.name} </p>
                <p>Birthday:{player?.birthday} </p>
                <p>Transfer:{player?.transfer} </p>
                <p>Position:{player?.position} </p>
            </div>
        </>
    )
}
export default Detail;
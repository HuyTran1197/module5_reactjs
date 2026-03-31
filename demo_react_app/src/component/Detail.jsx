import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {findById} from "../service/FootbalPlayerService.js";
import {getAll} from "../service/PositionService.js";

const Detail = () => {
    const [player,setPlayer] = useState({});
    const {id} = useParams();

    useEffect(() => {
        const fetData = async () => {
            setPlayer(await findById(id));
        }
        fetData();
    }, []);

    const [positionList,setPositionList] = useState([]);
    useEffect(() => {
        const fetDataP = async () => {
            setPositionList(await getAll())
        }
        fetDataP();
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
                <p>Position:{positionList.find(p=>p.id===player.playerPosition)?.name || ""} </p>
            </div>
        </>
    )
}
export default Detail;
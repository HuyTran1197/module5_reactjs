import {useEffect, useState} from "react";
import {getList} from "../service/FootbalPlayerService.js";
import DeletePlayer from "./DeletePlayer.jsx";
import AddPlayer from "./AddPlayer.jsx";

const FootballList = ()=>{
    const [footballList,setFootballList] = useState([]);
    const [deletePlayer,setDeletePlayer] = useState({
        name: ""
    });
    const [isShowModal,setIsShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        setFootballList([
            ...getList()
        ])
    }, [isLoading]);

    const handleOpenModal = (player)=>{
        setDeletePlayer(player);
        setIsShowModal(true);
    }

    return(
        <>
            {console.log("-----render----")}
            <AddPlayer setIsLoading={setIsLoading} />
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Player Id</th>
                    <th>Name</th>
                    <th>Birthday</th>
                    <th>Transfer</th>
                    <th>Position</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {footballList.map((e,i)=>(
                    <tr key={i}>
                        <td>{e.id}</td>
                        <td>{e.playerId}</td>
                        <td>{e.name}</td>
                        <td>{e.birthday}</td>
                        <td>{e.transfer}</td>
                        <td>{e.position}</td>
                        <td>
                            <button onClick={()=>{
                                handleOpenModal(e)
                            }}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <DeletePlayer isShowModal={isShowModal}
                    deletePlayer={deletePlayer}
                    closeModal={setIsShowModal}
                    setIsLoading={setIsLoading}
            />
        </>
    )
}

export default FootballList ;
import {useEffect, useState} from "react";
import {getList} from "../service/FootbalPlayerService.js";
import DeletePlayer from "./DeletePlayer.jsx";
import {Link} from "react-router";

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
            <h1>Football Player</h1>
            <Link to={'/football/add'}>Add new</Link>
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
                            <Link className={'btn btn-sm btn-primary'}
                                to={`/football/detail/${e.id}`}>
                                View
                            </Link>
                            <button className={'btn btn-sm btn-danger'} onClick={()=>{
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
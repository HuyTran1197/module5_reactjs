import {useEffect, useState} from "react";
import {getList} from "../service/FootbalPlayerService.js";
import DeletePlayer from "./DeletePlayer.jsx";
import {Link} from "react-router";
import {Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";

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

    const [search] = useState({
        playerId: "",
        name: "",
        position: ""
    });

    const handleSearch = (values) => {
        const filterList = getList().filter((player)=>
            (values.playerId==="" || player.playerId.toString().includes(values.playerId)) &&
            (values.name==="" || player.name.toLowerCase().includes(values.name.toLowerCase())) &&
            (values.position===""||player.position.toLowerCase().includes(values.position.toLowerCase()))
        );

        setFootballList(filterList);
    }

    const handleReset = () => {
        setFootballList([...getList()])
    }
    return(
        <>
            {console.log("-----render----")}
            <h1>Football Player</h1>
            <div>
                <Link to={'/football/add'} className={'btn btn-sm btn-success'}>Add new</Link>
            </div>
            <Formik initialValues={search} onSubmit={handleSearch}>
                <Form>
                    <Field name={'playerId'} placeHolder={'Enter player id'}/>
                    <Field name={'name'} placeHolder={'Enter name'}/>
                    <Field name={'position'} placeHolder={'Enter position'}/>
                    <Button type={'submit'} className={'btn btn-sm btn-secondary'}>Search</Button>
                    <Button type={'reset'}
                            onClick={handleReset}
                            className={'btn btn-sm btn-dark'}>
                        Reset
                    </Button>
                </Form>
            </Formik>
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
                {footballList.map((e)=>(
                    <tr key={e.id}>
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
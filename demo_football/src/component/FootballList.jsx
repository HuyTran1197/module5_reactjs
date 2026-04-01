import {useEffect, useState} from "react";
import {getList} from "../service/FootbalPlayerService.js";
import DeletePlayer from "./DeletePlayer.jsx";
import {Link} from "react-router";
import {Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {getAll} from "../service/PositionService.js";

const FootballList = () => {
    const [footballList, setFootballList] = useState([]);
    const [positionList, setPositionList] = useState([])
    const [deletePlayer, setDeletePlayer] = useState({
        // id: "",
        playerCode: "",
        name: "",
        // birthday: "",
        // transfer: "",
        position: ""
    });
    const [isShowModal, setIsShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetData = async () => {
            const playerList = await getList();
            setFootballList(playerList);
        }
        fetData();
    }, [isLoading]);

    useEffect(() => {
        const fetDataP = async () => {
            setPositionList(await getAll())
        }
        fetDataP();
    }, []);

    const handleOpenModal = (player) => {
        setDeletePlayer(player);
        setIsShowModal(true);
    }

    const [search] = useState({
        playerCode: "",
        name: "",
        position: ""
    });

    const handleSearch = async (values) => {
        const playerList = await getList();
        const filterList = playerList.filter(player =>
            (values.playerCode === "" || player.playerCode.toLowerCase().includes(values.playerCode.toLowerCase())) &&
            (values.name === "" || player.name.toLowerCase().includes(values.name.toLowerCase())) &&
            (values.position === "" || player.position.name === values.position)
        );

        setFootballList(filterList);
    }

    const handleReset = async () => {
        const playerList = await getList();
        setFootballList(playerList);
    }
    return (
        <>
            {console.log("-----render----")}
            <h1>Football Player</h1>
            <div>
                <Link to={'/football/add'} className={'btn btn-sm btn-success'}>Add new player</Link>
            </div>
            <Formik initialValues={search} onSubmit={handleSearch}>
                <Form>
                    <Field name={'playerCode'} placeholder={'Enter player id'}/>
                    <Field name={'name'} placeholder={'Enter name'}/>
                    <Field as="select" name="position">
                        <option value="">--------choose position----------</option>
                        {positionList.map(p => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                    </Field>
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
                    <th>Numerical order</th>
                    <th>Id</th>
                    <th>Player Id</th>
                    <th>Name</th>
                    <th>Birthday</th>
                    <th>Transfer</th>
                    <th>Position</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {footballList.map((player,i) => (
                    <tr key={player.id}>
                        <td>{i+1}</td>
                        <td>{player.id}</td>
                        <td>{player.playerCode}</td>
                        <td>{player.name}</td>
                        <td>{player.birthday}</td>
                        <td>{player.transfer}</td>
                        <td>{player.position?.name}</td>
                        <td>
                            <Link className={'btn btn-sm btn-primary'}
                                  to={`/football/detail/${player.id}`}>
                                View
                            </Link>
                            <button className={'btn btn-sm btn-danger'} onClick={() => handleOpenModal(player)}>
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

export default FootballList;
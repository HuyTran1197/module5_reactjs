import {useEffect, useState} from "react";
import {findALl, searchPlayer} from "../service/FootballPlayerService.js";
import {Link} from "react-router";
import {Button} from "react-bootstrap";
import DeletePlayer from "./DeletePlayer.jsx";
import {Field, Form, Formik} from "formik";
import {getALl} from "../service/PositionService.js";

const FootballList = () => {
    const [playerList,setPlayerList] = useState([]);

    const [deletePlayer,setDeletePlayer] = useState({
        id:"",
        playerCode:""
    });
    const [isShowModal,setIsShowModal] = useState(false);
    const [reload,setReload] = useState(false);

    useEffect(() => {
        const fetData = async () =>{
            setPlayerList(await findALl());
        }
        fetData();
    }, [reload]);


    const handleOpenModal = (player) => {
        setDeletePlayer(player);
        setIsShowModal(true);
    }
    const [positionList,setPositionList] = useState([]);
    useEffect(() => {
        const fetDataPosition = async () => {
            setPositionList(await getALl());
        }
        fetDataPosition();
    }, []);

    const [search] = useState({
        playerCode:"",
        name:"",
        position:""
    })

    const handleSearch = async (value) => {
        const code = value.playerCode;
        const name = value.name;
        const position = value.position;
        setPlayerList(await searchPlayer(code,name,position));
    }

    const handleReset = async () => {
        setPlayerList(await findALl());
    }

    return(
        <>
            <h1>Football Player Management</h1>
            <div>
                <Link className={'btn btn-sm btn-success'} to={'/football/add'}>Add new player</Link>
            </div>
            <Formik initialValues={search} onSubmit={handleSearch}>
                <Form>
                    <Field name={'playerCode'} placeholder={'Search code'}/>
                    <Field name={'name'} placeholder={'Search name'}/>
                    <Field as={'select'} name={'position'}>
                        <option value={''}>---choose position---</option>
                        {positionList.map((p)=>(
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </Field>
                    <Button className={'btn btn-sm'} type={'submit'}>Search</Button>
                    <Button type={'reset'}
                            className={'btn btn-sm btn-dark'}
                            onClick={handleReset}>
                        Reset
                    </Button>
                </Form>
            </Formik>
            <table>
                <thead>
                  <tr>
                      <th>Numerical order</th>
                      <th>Player code</th>
                      <th>Name</th>
                      <th>Birthday</th>
                      <th>Transfer</th>
                      <th>Position</th>
                      <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {playerList.map((player,i)=>(
                      <tr key={player.id}>
                          <td>{i+1}</td>
                          <td>{player.playerCode}</td>
                          <td>{player.name}</td>
                          <td>{player.birthday}</td>
                          <td>{player.transfer}</td>
                          <td>{player.position?.name}</td>
                          <td>
                              <Link className={'btn btn-sm btn-outline-info'} to={`/football/detail/${player.id}`}>
                                  View
                              </Link>
                              <Link className={'btn btn-sm btn-outline-warning'} to={`/football/edit/${player.id}`}>
                                  Edit
                              </Link>
                              <Button className={'btn btn-sm btn-danger'} onClick={()=> handleOpenModal(player)}>
                                  Delete
                              </Button>
                          </td>
                      </tr>
                  ))}
                </tbody>
            </table>
            <DeletePlayer isShowModal={isShowModal}
                          deletePlayer={deletePlayer}
                          closeModal={setIsShowModal}
                          setReload={setReload}
            />
        </>
    )
}

export default FootballList;
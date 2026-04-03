import {useEffect, useState} from "react";
import {findAll, searchPlayer} from "../service/FootballPlayerService.js";
import {Link} from "react-router";
import {Button} from "react-bootstrap";
import DeletePlayer from "./DeletePlayer.jsx";
import {getAll} from "../service/PositionService.js";
import {Field, Form, Formik} from "formik";

const FootballList = () => {
    const [footballList,setFootballList] = useState([]);
    const [isShowModal,setIsShowModal] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [deletePlayer,setDeletePlayer] = useState({
        playerCode: "",
        name: ""
    })
    const [positionList,setPositionList] = useState([]);


    useEffect(() => {
        const fetData = async () => {
            setFootballList(await findAll());
        }
        fetData();
    }, [isLoading]);

    useEffect(() => {
        const fetDataPosition = async () => {
            setPositionList(await getAll());
        }
        fetDataPosition();
    }, []);

    const [search] = useState({
        playerCode: "",
        name: "",
        position: ""
    })

    const handleSearch = async (values) => {
        const code = values.playerCode;
        const name = values.name;
        const position = values.position;
        setFootballList(await searchPlayer(code,name,position));

    }

    const handleReset = async () => {
        setFootballList(await findAll());
    }

    const handleOpenModal = (player) => {
        setDeletePlayer(player);
        setIsShowModal(true);
    }
    return(
        <>
            <h1>Football Player List</h1>
            <div>
                <Link to={'/football/add'} className={'btn btn-sm btn-success'}>Add new player</Link>
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
                    <Button type={'submit'} className={'btn btn-sm'}>Search</Button>
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
                      <th>Player code</th>
                      <th>Name</th>
                      <th>Birthday</th>
                      <th>Transfer</th>
                      <th>Position</th>
                      <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {footballList.map((player,i)=>(
                      <tr key={player.id}>
                          <td>{i+1}</td>
                          <td>{player.playerCode}</td>
                          <td>{player.name}</td>
                          <td>{player.birthday}</td>
                          <td>{player.transfer}</td>
                          <td>{player.position?.name}</td>
                          <td>
                              <Link className={'btn btn-sm btn-outline-info'}
                                  to={`/football/detail/${player.id}`}>
                                  Detail
                              </Link>
                              <Link className={'btn btn-sm btn-warning'}
                                  to={`/football/edit/${player.id}`}>
                                  Edit
                              </Link>
                              <Button className={'btn btn-sm btn-danger'}
                                      onClick={()=>
                                  handleOpenModal(player)}>
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
                          setIsLoading={setIsLoading}
            />
        </>
    )
}
export default FootballList;
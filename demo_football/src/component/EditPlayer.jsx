import {useEffect, useState} from "react";
import {getALl} from "../service/PositionService.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {editPlayer, findById} from "../service/FootballPlayerService.js";
import {useNavigate, useParams} from "react-router";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {Button} from "react-bootstrap";

const EditPlayer = () => {
    const [player,setPlayer] = useState({
        id:"",
        playerCode:"",
        name:"",
        birthday:"",
        transfer:"",
        position:""
    })

    const {id} = useParams();

    useEffect(() => {
        const fetData = async () => {
            const init = await findById(id);
            if (init!=null){
                setPlayer({
                    ...init,
                    position: JSON.stringify(init.position)
                })
            }
        }
        fetData()
    }, [id]);

    const [positionList,setPositionList] = useState([]);
    useEffect(() => {
        const fetDataPosition = async () => {
            setPositionList(await getALl());
        }
        fetDataPosition();
    }, []);

    const navigate = useNavigate();

    const handleEdit = async (player) => {
        player = {
            ...player,
            position: JSON.parse(player.position)
        }
        const isSuccess = await editPlayer(player);
        if (isSuccess){
            toast.success('Edit player success');
            navigate('/football');
        }else {
            toast.error('Edit fails');
        }
    }

    const validation = Yup.object({
        name:Yup.string().required('Please fill name')
            .matches(/^[A-Z][a-z]*(\s[A-z][a-z]*)+$/,'Format name is wrong'),
        birthday: Yup.date().required('Please fill birthday')
            .max(new Date(),'must not be in the future')
            .typeError('Format birthday is wrong'),
        transfer: Yup.string().required('Please fill transfer')
            .matches(/^[0-9,]+(\s[a-z]+)+$/,'Format transfer is wrong'),
        position: Yup.string().required('Please fill position')
    })
    return(
        <>
            <h1>Edit player</h1>
            <Formik initialValues={player} enableReinitialize={true} onSubmit={handleEdit} validationSchema={validation}>
                <Form>
                    <Field type={'hidden'} name={'id'}/>
                    <Field type={'hidden'} name={'playerCode'}/>
                    <div>
                        <label>Name: </label>
                        <Field name={'name'}/>
                        <ErrorMessage name={'name'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Birthday: </label>
                        <Field type={'date'} name={'birthday'}/>
                        <ErrorMessage name={'birthday'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Transfer: </label>
                        <Field name={'transfer'}/>
                        <ErrorMessage name={'transfer'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <Field as={'select'} name={'position'}>
                            <option value={''}>---choose position---</option>
                            {positionList.map((p)=>(
                                <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name={'position'} className={'text-danger'} component={'small'}/>
                    </div>
                    <Button type={'submit'}>Save</Button>
                </Form>
            </Formik>
        </>
    )
}
export default EditPlayer;
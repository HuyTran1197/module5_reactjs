import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {editPlayer, findById} from "../service/FootballPlayerService.js";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {toast} from "react-toastify";
import {getAll} from "../service/PositionService.js";

const EditPlayer = () => {
    const [player,setPlayer] = useState({
        id: "",
        playerCode: "",
        name: "",
        birthday: "",
        transfer: "",
        position: ""
    });
    const {id} = useParams();
    useEffect(() => {
        const fetData = async () => {
            const init = await findById(id);
            if (init){
                setPlayer({
                    ...init,
                    position: JSON.stringify(init.position)
                })
            }
        }
        fetData();
    }, [id]);
    const [positionList,setPositionList] = useState([]);

    useEffect(() => {
        const fetDataPosition = async () => {
            setPositionList(await getAll());
        }
        fetDataPosition();
    }, []);

    const navigate = useNavigate();

    const handleEdit = async (value) => {
        value = {
            ...value,
            position: JSON.parse(value.position)
        }
        const isSuccess = await editPlayer(value);
        if (isSuccess){
            toast.success('Edit player success');
            navigate('/football');
        }else {
            toast.error('Edit player fails');
        }

    }

    const validation = Yup.object({
        playerCode:Yup.string().required('Please fill player id')
            .matches(/^FP-[0-9]{4}$/,'Format code must be "FP-XXXX"'),
        name:Yup.string().required('Please fill name')
            .matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/,'Format name is wrong'),
        birthday: Yup.date().required('Please fill birthday')
            .max(new Date(),'must not be in the future')
            .typeError('Format birthday is wrong'),
        transfer: Yup.string().required('Please fill transfer')
            .matches(/^[0-9,]+(\s[a-z]+)+$/,'Format transfer is wrong'),
        position: Yup.string().required('Please fill position')
    })

    return(
        <>
            <Formik initialValues={player} enableReinitialize={true} onSubmit={handleEdit} validationSchema={validation}>
                <Form>

                        <Field type={'hidden'} name={'id'}/>
                    <div>
                        <label>Player code: </label>
                        <Field type={'text'} name={'playerCode'}/>
                        <ErrorMessage name={'playerCode'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Name: </label>
                        <Field type={'text'} name={'name'}/>
                        <ErrorMessage name={'name'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Birthday: </label>
                        <Field type={'date'} name={'birthday'}/>
                        <ErrorMessage name={'birthday'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Transfer: </label>
                        <Field type={'text'} name={'transfer'}/>
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
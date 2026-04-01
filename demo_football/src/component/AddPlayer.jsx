import {useEffect, useState} from "react";
import {addNew} from "../service/FootbalPlayerService.js";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Button} from "react-bootstrap";
import {getAll} from "../service/PositionService.js";

const AddPlayer = () => {
    const [player] = useState({
        id:"",
        playerId:"",
        name: "",
        birthday:"",
        transfer:"",
        playerPosition:""
    });
    const [positionList,setPositionList] = useState([])

    useEffect(() => {
        const fetData = async () => {
            setPositionList(await getAll())
        }
        fetData();
    }, []);

    const navigate = useNavigate();

    const handleAdd = (value) => {
        value={
            ...value,
            playerPosition: JSON.parse(value.playerPosition)
        }
        const fetData = async () => {
            const isSuccess = await addNew(value);
            if (isSuccess){
                toast.success('Add new success');
            }else {
                toast.error('Id is already exists');
            }
            navigate('/football');
        }
        fetData();
    }

    const validation = Yup.object({
        id:Yup.number().required('Please fill id')
            .min(1,"must not be less than 1"),
        playerId:Yup.number().required('Please fill player id')
            .min(1000,"number's length must not be less than 4"),
        name:Yup.string().required('Please fill name')
            .matches(/^[A-Z][a-z]*(\s[A-z][a-z]*)+$/,'Format name is wrong'),
        birthday: Yup.date().required('Please fill birthday')
            .max(new Date(),'must not be in the future')
            .typeError('Format birthday is wrong'),
        transfer: Yup.string().required('Please fill transfer')
            .matches(/^[0-9,]+(\s[a-z]+)+$/,'Format transfer is wrong'),
        playerPosition: Yup.string().required('Please fill position')
    })

    return(
        <>
            <Formik initialValues={player} onSubmit={handleAdd} validationSchema={validation}>
                <Form>
                    <div>
                        <label>ID</label>
                        <Field type ="number" name ="id"/>
                        <ErrorMessage name={'id'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Player Id</label>
                        <Field type ="number" name ="playerId"/>
                        <ErrorMessage name={'playerId'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Name</label>
                        <Field type ="text" name ="name"/>
                        <ErrorMessage name={'name'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Birthday</label>
                        <Field type ="date" name ="birthday"/>
                        <ErrorMessage name={'birthday'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Transfer</label>
                        <Field type ="text" name ="transfer"/>
                        <ErrorMessage name={'transfer'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <Field as="select" name="playerPosition">
                            <option value="">--------choose position----------</option>
                            {positionList.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name={'playerPosition'} className={'text-danger'} component={'small'}/>

                    </div>
                    <div>
                        <Button type={'submit'}>Save</Button>
                    </div>
                </Form>

            </Formik>
        </>
    )
}
export default AddPlayer ;
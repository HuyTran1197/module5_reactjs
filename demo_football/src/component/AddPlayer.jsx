// import {useEffect, useState} from "react";
// import {ErrorMessage, Field, Form, Formik} from "formik";
// import {addNew} from "../service/FootballPlayerService.js";
// import {useNavigate} from "react-router";
// import {toast} from "react-toastify";
// import {getAll} from "../service/PositionService.js";
// import * as Yup from "yup";
// import {Button} from "react-bootstrap";
//
// const AddPlayer = () => {
//     const [player] = useState({
//         id: "",
//         playerCode: "",
//         name: "",
//         birthday: "",
//         transfer: "",
//         position: ""
//     });
//     const [positionList,setPositionList] = useState([]);
//
//     useEffect(() => {
//         const fetDataPosition = async () => {
//             setPositionList(await getAll());
//         }
//         fetDataPosition();
//     }, []);
//
//     const navigate = useNavigate();
//
//     const handleAdd = (value) => {
//         value = {
//             ...value,
//             position: JSON.parse(value.position)
//         }
//         const fetData = async () => {
//             const isSuccess = await addNew(value);
//             if (isSuccess){
//                 toast.success('Add new success');
//             }else {
//                 toast.error('Add new fails, ID is already exists');
//             }
//             navigate('/football');
//         }
//         fetData();
//     }
//
//     const validation = Yup.object({
//         playerCode:Yup.string().required('Please fill player id')
//             .matches(/^FB-[0-9]{4}$/,'Format code must be "FB-XXXX"'),
//         name:Yup.string().required('Please fill name')
//             .matches(/^[A-Z][a-z]*(\s[A-z][a-z]*)+$/,'Format name is wrong'),
//         birthday: Yup.date().required('Please fill birthday')
//             .max(new Date(),'must not be in the future')
//             .typeError('Format birthday is wrong'),
//         transfer: Yup.string().required('Please fill transfer')
//             .matches(/^[0-9,]+(\s[a-z]+)+$/,'Format transfer is wrong'),
//         position: Yup.string().required('Please fill position')
//     })
//
//     return(
//         <>
//             <Formik initialValues={player} onSubmit={handleAdd} validationSchema={validation}>
//                 <Form>
//                     <div>
//                         <label>Player code: </label>
//                         <Field type={'text'} name={'playerCode'}/>
//                         <ErrorMessage name={'playerCode'} className={'text-danger'} component={'small'}/>
//                     </div>
//                     <div>
//                         <label>Name: </label>
//                         <Field type={'text'} name={'name'}/>
//                         <ErrorMessage name={'name'} className={'text-danger'} component={'small'}/>
//                     </div>
//                     <div>
//                         <label>Birthday: </label>
//                         <Field type={'date'} name={'birthday'}/>
//                         <ErrorMessage name={'birthday'} className={'text-danger'} component={'small'}/>
//                     </div>
//                     <div>
//                         <label>Transfer: </label>
//                         <Field type={'text'} name={'transfer'}/>
//                         <ErrorMessage name={'transfer'} className={'text-danger'} component={'small'}/>
//                     </div>
//                     <div>
//                         <Field as={'select'} name={'position'}>
//                             <option value={''}>---choose position---</option>
//                             {positionList.map((p)=>(
//                                 <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>
//                             ))}
//                         </Field>
//                         <ErrorMessage name={'position'} className={'text-danger'} component={'small'}/>
//                     </div>
//                     <Button type={'submit'}>Save</Button>
//                 </Form>
//             </Formik>
//         </>
//     )
// }
// export default AddPlayer;

import {useEffect, useState} from "react";
import {getALl} from "../service/PositionService.js";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addNew} from "../service/FootballPlayerService.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Button} from "react-bootstrap";

const AddPlayer = () => {
    const [player] = useState({
        id: "",
        playerCode: "",
        name: "",
        birthday:"",
        transfer:"",
        position:""
    });
    const [positionList,setPositionList] = useState([]);
    useEffect(() => {
        const fetDataPosition= async ()=>{
            setPositionList(await getALl());
        }
        fetDataPosition();
    }, []);

    const navigate = useNavigate();
    const handleAdd = async (value) => {
        value = {
            ...value,
            position: JSON.parse(value.position)
        }
        const isSuccess = await addNew(value);
        if (isSuccess){
            toast.success('Add new success');
            navigate('/football');
        }else {
            toast.error('Add new fails!! Player code is already exists');
        }
    }
        const validation = Yup.object({
        playerCode:Yup.string().required('Please fill player code')
            .matches(/^FP-[0-9]{4}$/,'Format code must be "FP-XXXX"'),
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
            <h1>Add new player</h1>
            <Formik initialValues={player} onSubmit={handleAdd} validationSchema={validation}>
                <Form>
                    <div>
                        <label>Player code: </label>
                        <Field name={'playerCode'} placeholder={'Enter player code'}/>
                        <ErrorMessage name={'playerCode'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Name: </label>
                        <Field name={'name'} placeholder={'Enter name'}/>
                        <ErrorMessage name={'name'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Birthday: </label>
                        <Field type={'date'} name={'birthday'}/>
                        <ErrorMessage name={'birthday'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Transfer: </label>
                        <Field name={'transfer'} placeholder={'Enter transfer'}/>
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
export default AddPlayer;
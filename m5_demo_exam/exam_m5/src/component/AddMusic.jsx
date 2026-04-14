import {useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addNew} from "../service/MusicService.jsx";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {Button} from "react-bootstrap";

const AddMusic = () => {
    const [music] = useState({
        id: "",
        name: "",
        singleMan: "",
        compose: "",
        startTime: "",
        likeCount: 0,
        status: "Lưu trữ",
    })
    const navigate = useNavigate();
    const handleAdd = async (value) => {
        const isSuccess = await addNew(value);
        if (isSuccess) {
            toast.success('Đăng ký thành công');
            navigate('/music');
        } else {
            toast.error('Đăng ký không thành công');
        }
    }
    const validation = Yup.object({
        name: Yup.string().required('Phải nhập bài hát')
            .matches(/^[A-Z][a-z]+(\s[a-z]*)*$/, 'Sai định dạng'),
        singleMan: Yup.string().required('Phải nhập ca sĩ')
            .max(30, 'tối đa 30 kí tự')
            .matches(/^[A-Z][a-z]+(\s[A-Z][a-z]*)*$/, 'Sai định dạng'),
        compose: Yup.string().required('Phải nhập nhạc sĩ')
            .max(30, 'tối đa 30 kí tự')
            .matches(/^[A-Z][a-z]+(\s[A-Z][a-z]*)*$/, 'Sai định dạng'),
        startTime: Yup.string().required('Nhập thời gian phát')
            .matches(/^[0-9]{2}:[0-9]{2}$/, "Sai định dạng hh:mm")
    })

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg p-4">
                            <Formik initialValues={music} onSubmit={handleAdd} validationSchema={validation}>
                                <Form>
                                    <div className="mb-3">
                                        <label className="form-label">Tên bài hát</label>
                                        <Field name={'name'} className="form-control text-center"/>
                                        <ErrorMessage name={'name'} className={'text-danger'} component={'small'}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Ca sĩ:</label>
                                        <Field name={'singleMan'} className="form-control text-center"/>
                                        <ErrorMessage name={'singleMan'} className={'text-danger'} component={'small'}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nhạc sĩ:</label>
                                        <Field name={'compose'} className="form-control text-center"/>
                                        <ErrorMessage name={'compose'} className={'text-danger'} component={'small'}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Thời gian phát:</label>
                                        <Field name={'startTime'} placeholder={'hh:mm'} className="form-control text-center"/>
                                        <ErrorMessage name={'startTime'} className={'text-danger'} component={'small'}/>
                                    </div>
                                    <Field name={'likeCount'} type={'hidden'}/>
                                    <Field name={'status'} value={'Lưu trữ'} type={'hidden'}/>
                                    <Button type={'submit'}>Đăng ký</Button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddMusic;
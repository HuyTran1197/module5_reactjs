import {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addNew} from "../service/BookService.jsx";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {getAll} from "../service/CategoryService.jsx";
import {Button} from "react-bootstrap";

const AddBook = () => {
    const [book] = useState({
        id: "",
        code: "",
        title: "",
        author: "",
        price: "",
        category: ""
    });
    const [categoryList,setCategoryList] = useState([]);
    useEffect(() => {
        const fetData = async () => {
            setCategoryList(await getAll());
        }
        fetData();
    }, []);
    const navigate = useNavigate();
    const handleAdd = async (value) => {
        value = {
            ...value,
            category: JSON.parse(value.category)
        }
        const isSuccess = await addNew(value);
        if (isSuccess) {
            toast.success('Add new success');
            navigate('/book');
        } else {
            toast.error('Add new fails, code is already exists');
        }
    }
    const validation = Yup.object({
        code: Yup.string().required('Please fill code')
            .matches(/^B[0-9]{3}$/, 'Format code is wrong'),
        title: Yup.string().required('Please fill title')
            .matches(/^[A-Z][a-z]*(\s[A-z][a-z]*)*$/, 'Format title is wrong'),
        author: Yup.string().required('Please fill author')
            .matches(/^[A-Z][a-z]*(\s[A-z][a-z]*)+$/, 'Format author is wrong'),
        price: Yup.number().required('Please fill price')
            .min(1, "price must not be less than 1"),
        category: Yup.string().required('Please fill team')
    })

    return (
        <>
            <h1>Add new book</h1>
            <Formik initialValues={book} onSubmit={handleAdd} validationSchema={validation}>
                <Form>
                    <div>
                        <label>Code:</label>
                        <Field name={'code'} placeholder={'Enter code'}/>
                        <ErrorMessage name={'code'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Title:</label>
                        <Field name={'title'} placeholder={'Enter title'}/>
                        <ErrorMessage name={'title'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Author:</label>
                        <Field name={'author'} placeholder={'Enter author'}/>
                        <ErrorMessage name={'author'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <label>Price:</label>
                        <Field name={'price'} type={'number'}/>
                        <ErrorMessage name={'price'} className={'text-danger'} component={'small'}/>
                    </div>
                    <div>
                        <Field name={'category'} as={'select'}>
                            <option value={''}>---choose category---</option>
                            {categoryList.map((ctg)=>(
                                <option key={ctg.id} value={JSON.stringify(ctg)}>{ctg.name}</option>
                            ))}
                        </Field>
                        <ErrorMessage name={'category'} className={'text-danger'} component={'small'}/>
                    </div>
                    <Button type={'submit'}>Save</Button>
                </Form>
            </Formik>
        </>
    )
}
export default AddBook;
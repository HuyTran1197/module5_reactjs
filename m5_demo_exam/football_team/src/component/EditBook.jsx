import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getAll} from "../service/CategoryService.jsx";
import {useNavigate, useParams} from "react-router";
import {toast} from "react-toastify";
import {editBook, findById} from "../service/BookService.jsx";

const EditBook = () => {
    const [book,setBook] = useState(null);
    const [categoryList,setCategoryList] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetData = async () => {
            const init = await findById(id);
            setBook({
                ...init,
                category: JSON.stringify(init.category)
            })
            setCategoryList(await getAll());
        }
        fetData();
    }, [id]);

    const navigate = useNavigate();
    const handleEdit = async (value) => {
        value = {
            ...value,
            category: JSON.parse(value.category)
        }
        const isSuccess = await editBook(value);
        if (isSuccess) {
            toast.success('Edit success');
            navigate('/book');
        } else {
            toast.error('Edit fails');
        }
    }
    const validation = Yup.object({
        title: Yup.string().required('Please fill title')
            .matches(/^[A-Z][a-z]*(\s[A-z][a-z]*)*$/, 'Format title is wrong'),
        author: Yup.string().required('Please fill author')
            .matches(/^[A-Z][a-z]*(\s[A-z][a-z]*)+$/, 'Format author is wrong'),
        price: Yup.number().required('Please fill price')
            .min(1, "price must not be less than 1"),
        category: Yup.string().required('Please fill team')
    })

    if (book==null){
        return "";
    }
    return (
        <>
            <h1>Add new book</h1>
            <Formik initialValues={book} onSubmit={handleEdit} validationSchema={validation}>
                <Form>
                    <Field name={'id'} type={'hidden'}/>
                    <Field name={'code'} type={'hidden'}/>
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
export default EditBook;
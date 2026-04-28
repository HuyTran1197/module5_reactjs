import {useEffect, useState} from "react";
import {searchTrip} from "../service/TripService";
import "../styles/trip.css";
import {Formik, Form, Field} from "formik";
import {Button} from "react-bootstrap";
import {getAll} from "../service/CategoryService.js";
import {Link} from "react-router";

const List = () => {
    const [trips, setTrips] = useState([]);
    const [category, setCategory] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState({
        name: "",
        startTime: "",
        endTime: "",
        categoryId: ""
    });

    // load khi đổi page
    useEffect(() => {
        const fetData = async () => {
            const result = await searchTrip({
                ...search,
                page
            })
            setTrips(result.data);
            setTotalPage(result.totalPage);
            setCategory(await getAll());
            console.log("search:", search);
            console.log("result:", result);
        }
        fetData();
    }, [page, search]);


    const handleSearch = async (values) => {
        setSearch({
            searchName: values.name,
            searchStartTime: values.startTime,
            searchEndTime: values.endTime,
            searchCategory: values.categoryId
        });
        setPage(1);
    };
    const handleReset = () => {
        setSearch({
            name: "",
            startTime: "",
            endTime: "",
            categoryId: ""
        });
        setPage(1);
    }

    return (
        <div className="container py-4">
            <div className="main-container">

                <div className="header-box">
                    <h1><i className="fa-solid fa-plane-departure"></i> Quản lý lịch trình</h1>

                </div>

                {/* SEARCH */}
                <div className="card card-custom p-3 mb-4">
                    <Formik initialValues={search} onSubmit={handleSearch}>
                        <Form className={'row g-3'}>

                            <div className={"col-12 col-md-3"}>
                                <Field className={"form-control"} name={'name'}
                                       placeholder="🔍 Tìm tên..."/>
                            </div>

                            <div className={"col-12 col-md-3"}>
                                <Field className="form-control" name={'startTime'} type="datetime-local"/>
                            </div>

                            <div className={"col-12 col-md-3"}>
                                <Field className={"form-control"} name={"endTime"} type="datetime-local"/>
                            </div>

                            <div className={"col-12 col-md-2"}>
                                <Field className={'form-select'}
                                       name={'categoryId'}
                                       as={'select'}>
                                    <option value={''}>📂 Thể loại</option>
                                    {category.map((e) => (
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    ))}
                                </Field>
                            </div>

                            <div className={"col-12 col-md-1 d-grid"}>
                                <button className="btn btn-primary">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                                <button type={"reset"}
                                        onClick={handleReset}
                                        className={'btn btn-sm btn-dark'}>
                                    ↩
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>

                {/* TABLE */}
                <div className="table-container">
                    <table className="table text-center align-middle">
                        <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Địa điểm</th>
                            <th>Thời gian</th>
                            <th>Giá</th>
                            <th>Xem thêm</th>
                        </tr>
                        </thead>

                        <tbody>
                        {trips.map((t => (
                            <tr key={t.id}>
                                <td data-label="Tên">{t.name}</td>

                                <td data-label="Địa điểm">
                                    <i className="fa-solid fa-location-dot text-primary"></i> {t.location}
                                </td>

                                <td data-label="Thời gian">
                                    <div className="badge-time">
                                        <div>{t.startTime}</div>
                                        →
                                        <div>{t.endTime}</div>
                                    </div>
                                </td>
                                <td data-label="Giá">
                                    {t.price} 🐟
                                </td>
                                <td>
                                    <Link to={`/detail/${t.id}`}>
                                        <i className={"fa-solid fa-eye"}></i>
                                    </Link>
                                </td>
                            </tr>
                        )))}
                        {(trips.length == 0) ?
                            <tr>
                                <td className={'text-danger'} colSpan={5}><b>Không có dữ liệu !!!</b></td>
                            </tr>
                            : ""
                        }
                        <tr className="bg-light">
                            <td colSpan={5} className="text-sm-center fw-bold text-success">
                                Tổng: <span>{trips.reduce((sum, t) => sum + t.price, 0)} 🐟</span>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <div className="pagination-box">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                    >
                                        {"<"}
                                    </button>

                                    <span className="mx-2">
              Trang {page} / {totalPage}
            </span>

                                    <button
                                        className="btn btn-sm btn-dark"
                                        disabled={page === totalPage}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        {">"}
                                    </button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>



                </div>

            </div>
        </div>
    );
};

export default List;
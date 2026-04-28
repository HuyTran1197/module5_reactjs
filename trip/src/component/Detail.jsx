import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/detail.css";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [trip, setTrip] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/data/db.json");
            const found = res.data.trips.find(t => t.id === Number(id));
            setTrip(found);

            const categories = res.data.categories;
            const category = categories.find(c => c.id === found.categoryId);

            setTrip({
                ...found,
                categoryName: category?.name
            });
        };
        fetchData();
    }, [id]);

    if (!trip) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">

                    <div className="card detail-card">
                        <h4>
                            <i className="fa-solid fa-info-circle"></i> Thông tin kế hoạch
                        </h4>

                        <p>
                            <i className="fa-solid fa-tag"></i>
                            Loại:
                            <span>{trip?.categoryName}</span>
                        </p>

                        <p>
                            <i className="fa-solid fa-utensils"></i>
                            Tên:
                            <span>{trip?.name}</span>
                        </p>

                        <p>
                            <i className="fa-solid fa-money-bill-wave"></i>
                            Giá:
                            <span>{trip?.price} 🐟</span>
                        </p>

                        <p>
                            <i className="fa-solid fa-location-dot"></i>
                            Địa điểm:
                            <span>{trip?.location}</span>
                        </p>

                        <p>
                            <i className="fa-solid fa-arrow-right-long"></i>
                            Xuất phát:
                            <span>{trip?.startTime}</span>
                        </p>

                        <p>
                            <i className="fa-solid fa-flag-checkered"></i>
                            Kết thúc:
                            <span>{trip?.endTime}</span>
                        </p>

                        <button
                            className="btn btn-danger w-100 mt-3"
                            onClick={() => navigate("/")}
                        >
                            Quay lại
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Detail;
import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import { BASE_PULIC } from "../utils/config";
import "./tour-card.css";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const TourCard = ({ tour }) => {
  const { _id, title, city_id, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const [listPlace, setListPlace] = useState([]);

  useEffect(() => {
    getAllPlace();
  }, []);

  async function getAllPlace() {
    try {
      const res = await axios.get(`${BASE_URL}/place/`);
      setListPlace(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleNameCity(city_id) {
    if (listPlace) {
      const cityResult = listPlace.find((cityItem) => cityItem._id === city_id);
      return cityResult ? cityResult.name : "Chưa xác định";
    }
    return "Chưa xác định";
  }

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={`${BASE_PULIC}/${photo}`} alt="tour-img" />
          {featured ? <span>Đặc sắc</span> : <span>Bình thường</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between ">
            <span className="tour__location d-flex align-items-center gap-1 text-limit-city">
              <i className="ri-map-pin-line"></i> {handleNameCity(city_id)}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>{" "}
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Chưa đánh giá"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="tour__title text-limit-card">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              {price}.000 vnd <span> /người</span>
            </h5>

            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Đặt Ngay</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;

import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import { BASE_PULIC } from "../utils/config";
import "./employeeCard.css";

const EmployeeCard = ({ employee }) => {
  const { _id, name, photo, position, email, phone, address, reviews } =
    employee;
  const { totalRating, avgRating } = calculateAvgRating(reviews);
  console.log(employee);

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img emp">
          <img src={`${BASE_PULIC}/${photo}`} alt="tour-img" />
          {/* {featured && <span>Đặt sắc</span>} */}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            {/* <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {city}
            </span> */}
            {/* <span className="tour__rating d-flex align-items-center gap-1">
              <i className="ri-star-fill"></i>{" "}
              {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                "Chưa đánh giá"
              ) : (
                <span>({reviews.length})</span>
              )}
            </span> */}
          </div>
          <div
            className="position-relative d-flex justify-content-center team-item"
            style={{ margin_top: "-19px" }}
          >
            <a className="btn btn-square btn__square mx-1" href="">
              <i className="ri-facebook-circle-line"></i>
            </a>
            <a className="btn btn-square btn__square mx-1" href="">
              <i className="ri-twitter-line"></i>
            </a>
            <a className="btn btn-square btn__square mx-1" href="">
              <i className="ri-instagram-line"></i>
            </a>
          </div>
          <div className="card__top d-flex align-items-center justify-content-between card_employee">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class="ri-user-5-line"></i>
              <Link className="user_employee" to={`/tourGuide/${_id}`}>
                {name}
              </Link>
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

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <button className="btn booking__btn">
              <Link to={`/tourGuide/${_id}`}>Xem chi tiết</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeCard;

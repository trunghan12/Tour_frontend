import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import { BASE_PULIC } from "../utils/config";
import "./placeCard.css";

const PlaceCard = ({ place }) => {
  const { _id, name, photo, description } = place;
  //   const { totalRating, avgRating } = calculateAvgRating(reviews);
  console.log(place);

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img src={`${BASE_PULIC}/${photo}`} alt="tour-img" />
        </div>
        <CardBody>
          <h5 className="tour__title text-limit">
            <Link to={`/toursPlace/${_id}`}>{name}</Link>
          </h5>
          <p className="limitText">{description}</p>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3"></div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PlaceCard;

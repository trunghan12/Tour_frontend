import React, { useEffect, useRef, useState, useContext } from "react";
import "../style/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import Newsletter from "./../shared/Newsletter";
import useFetch from "./../hooks/useFetch";
import { BASE_URL, BASE_PULIC } from "./../utils/config";
import { AuthContext } from "./../context/AuthContext";
import axios from "axios";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TourDetails = () => {
  const { id } = useParams();

  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [cityName, setCityName] = useState("");
  const [employee, setEmployee] = useState("");

  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [price_children, setPriceChildren] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [maxGroupSize_chidlren, setMaxGroupSizeChildren] = useState("");
  const [city_id, setCityId] = useState("");
  const [employee_id, setEmployeeId] = useState("");
  const [tour, setTour] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTourDetail();
  }, []);

  async function getTourDetail() {
    try {
      const res = await axios.get(`${BASE_URL}/tours/${id}`);
      if (res.status == 200) {
        setPhoto(res.data.data.photo);
        setTitle(res.data.data.title);
        setDesc(res.data.data.desc);
        setPrice(res.data.data.price);
        setAddress(res.data.data.address);
        setPriceChildren(res.data.data.price_children);
        setMaxGroupSize(res.data.data.maxGroupSize);
        setMaxGroupSizeChildren(res.data.data.maxGroupSize_chidlren);
        setCityId(res.data.data.city_id);
        setEmployeeId(res.data.data.employee_id);
        if (res.data.data.reviews.length > 0) {
          setReviews(res.data.data.reviews.reverse());
        }
        setTour(res.data.data);
      }

      const data = await res.data;
      const dataResponse = await data.data;
      const employee_id = await dataResponse.employee_id;
      if (employee_id) {
        const resPLace = await axios.get(`${BASE_URL}/employee/` + employee_id);
        if (resPLace.status == 200) {
          resPLace.data.data && resPLace.data.data.name
            ? setCityName(resPLace.data.data.name)
            : setCityName("Chưa xác định");
        }
      }
      const city_id = await dataResponse.city_id;
      if (city_id) {
        const resPLace = await axios.get(`${BASE_URL}/place/` + city_id);
        if (resPLace.status == 200) {
          resPLace.data.data && resPLace.data.data.name
            ? setEmployee(resPLace.data.data.name)
            : setEmployee("Chưa xác định");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  // format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    if (!reviewText) {
      return toast.error("Vui lòng nhập bình luận");
    } else {
      // // try {
      if (!user || user === undefined || user === null) {
        toast.error("Bạn chưa đăng nhập");
      }

      var reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
        tourName: title,
      };

      try {
        const res = await fetch(`${BASE_URL}/review/${id}`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(reviewObj),
        });

        const result = await res.json();
        if (!res.ok) {
          return toast.error(result.message);
        } else {
          reviewMsgRef.current.value = "";
          toast.success("Bình luận thành công");
          const resReview = await axios.get(`${BASE_URL}/tours/${id}`);
          if (resReview.data.data.reviews.length > 0) {
            setReviews(resReview.data.data.reviews.reverse());
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <section>
        <Container>
          <ToastContainer />

          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={`${BASE_PULIC}/${photo}`} alt="" />

                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        className="ri-star-fill"
                        style={{ color: "var(--secondary-color)" }}
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Chưa đánh giá"
                      ) : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>

                    <span>
                      <i className="ri-map-pin-user-fill"></i> {cityName}
                    </span>
                    <span>
                      <i className="ri-group-line"></i> {maxGroupSize} vé người
                      lớn
                    </span>
                    <span>
                      <i className="ri-group-line"></i>
                      {maxGroupSize_chidlren} vé trẻ em
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i className="ri-map-pin-2-line"></i> {employee}
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i> {price}
                      .000 vnd /người lớn
                    </span>
                    <span>
                      <i className="ri-money-dollar-circle-line"></i>
                      {price_children}.000 vnd /trẻ em
                    </span>
                  </div>

                  <h5>Mô tả</h5>
                  <p>{desc}</p>
                </div>

                {/* =========== tour reviews section ============= */}

                <div className="tour__reviews mt-4">
                  <h4>Đánh giá ({reviews?.length} đánh giá)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      <span onClick={() => setTourRating(1)}>
                        1 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(2)}>
                        2 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(3)}>
                        3 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(4)}>
                        4 <i className="ri-star-s-fill"></i>
                      </span>
                      <span onClick={() => setTourRating(5)}>
                        5 <i className="ri-star-s-fill"></i>
                      </span>
                    </div>

                    <div className="review__input">
                      <input
                        type="text"
                        ref={reviewMsgRef}
                        placeholder="Bình luận"
                        className="pl-3"
                      />
                      <button
                        className="btn primary__btn text-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>

                  <ListGroup className="user__reviews">
                    {reviews?.map((review) => (
                      <>
                        {review.isHide === false ? (
                          <div key={review._id} className="review__item">
                            <img src={avatar} alt="" />
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p className="mb-2">
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString("en-US", options)}
                                  </p>
                                </div>

                                <span className="d-flex align-items-center">
                                  {review.rating}
                                  <i className="ri-star-s-fill"></i>
                                </span>
                              </div>
                              <h6 className="mb-0">{review.reviewText}</h6>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}

                        {(review.replyText && review.isHide) === false && (
                          <div className="review__item review__admin_item ml-5">
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                              alt=""
                            />
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>Admin</h5>
                                  <p className="mb-2">
                                    {new Date().toLocaleDateString(
                                      "en-US",
                                      options
                                    )}
                                  </p>
                                </div>
                              </div>
                              <h6 className="mb-0">{review.replyText}</h6>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                  </ListGroup>
                </div>

                {/* =========== tour reviews section end ============= */}
              </div>
            </Col>

            <Col lg="4">
              {tour && tour._id && (
                <Booking tour={tour} avgRating={avgRating} />
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;

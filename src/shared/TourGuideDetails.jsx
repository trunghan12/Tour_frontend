import React, { useEffect, useRef, useState, useContext } from "react";
import calculateAvgRating from "./../utils/avgRating";
import Newsletter from "./../shared/Newsletter";
import avatar from "../assets/images/avatar.jpg";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { AuthContext } from "./../context/AuthContext";
import { BASE_URL, BASE_PULIC } from "./../utils/config";
import "./tourguidedetail.css";
import Booking from "../components/Booking/Booking";
import useFetch from "./../hooks/useFetch";
import { useParams } from "react-router-dom";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const TourGuideDetails = () => {
  const { id } = useParams();

  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [photo, setPhoto] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [employee, setEmployee] = useState({})
  const [reviews, setReviews] = useState([]);

  // const {
  //   data: employee,
  //   loading,
  //   error,
  // } = useFetch(`${BASE_URL}/employee/${id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
    getGuideDetail()
  }, []);

  async function getGuideDetail() {
    const res = await axios.get(`${BASE_URL}/employee/${id}`)
    if (res.status == 200) {
      setName(res.data.data.name)
      setPhoto(res.data.data.photo)
      setAddress(res.data.data.address)
      setDescription(res.data.data.description)
      setEmail(res.data.data.email)
      setPhone(res.data.data.phone)
      if (res.data.data.reviews.length > 0) {
        setReviews(res.data.data.reviews.reverse())
      }
    }
  }


  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

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
        employeeName:name,
      };
      try {
        const res = await fetch(`${BASE_URL}/reviewemployee/${id}`, {
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
          toast.success('Bình luận thành công')
          reviewMsgRef.current.value = ""
          const res = await axios.get(`${BASE_URL}/employee/${id}`)
          setReviews(res.data.data.reviews.reverse())
        }
      } catch (err) {
        alert(err.message);
      }
    }
  };


  return (
    <>
      <div className="container-xxl py-5">
      <ToastContainer/>
        <div className="container">
          <div className="row g-5">
            <div
              className="col-lg-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ minHeight: "400px" }}
            >
              <div className="position-relative h-100">
                <img
                  className="img-fluid position-absolute w-100 h-100"
                  src={`${BASE_PULIC}/${photo}`}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="tour-guide-details row">
                <h1 className="mb-4">Thông tin chi tiết</h1>
                <h4 className="mb-3">
                  Họ và tên: <span>{name}</span>
                </h4>
                <hr className="col-lg-5 css-hr" />
                <h4 className="mb-3">
                  Email: <span>{email}</span>
                </h4>
                <hr className="col-lg-5 css-hr" />
                <h4 className="mb-3">
                  Số điện thoại: <span>{phone}</span>
                </h4>
                <hr className="col-lg-5 css-hr" />
                <h4 className="mb-3">
                  Địa chỉ: <span>{address}</span>
                </h4>
                <hr className="col-lg-5 css-hr" />
                <h4 className="mb-3">
                  Kinh nghiệm: <span>5 năm</span>
                </h4>
                <hr className="col-lg-5 css-hr" />
                <h4 className="mb-3">
                  Ngôn ngữ: <span>English, Spanish</span>
                </h4>
              </div>
            </div>
          </div>
          <div className="Description mt-4 mb-4">
            <div className="d-flex align-items-center gap-5">
              <span className="tour__rating d-flex align-items-center gap-1">
                <i
                  className="ri-star-fill"
                  style={{ color: "var(--secondary-color)" }}
                ></i>
                {avgRating === 0 ? null : avgRating}
                {totalRating === 0 ? (
                  "chưa đánh giá"
                ) : (
                  <span>({reviews?.length})</span>
                )}
              </span>

              <span>
                <i className="ri-map-pin-user-fill"></i> {address}
              </span>
            </div>
            <h4 className="mt-4">Mô tả:</h4>
            <span>{description}</span>
          </div>
          <div className="tour__reviews mt-4">
            <h4>Đánh giá ({reviews?.length} Đánh giá)</h4>
            <form onSubmit={submitHandler}>
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
                  placeholder="Viết bình luận của bạn..."
                  required
                />
                <button className="btn primary__btn text-white" type="submit">
                  Submit
                </button>
              </div>
              <ListGroup className="user__reviews">
                {reviews?.map((reviewemployee) => (
                  <>
                    {reviewemployee.isHide === false ? <div key={reviewemployee._id} className="review__item">
                      <img src={avatar} alt="" />
                      <div className="w-100">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h5>{reviewemployee.username}</h5>
                            <p className="mb-2">
                              {new Date(
                                reviewemployee.createdAt
                              ).toLocaleDateString("en-US", options)}
                            </p>
                          </div>

                          <span className="d-flex align-items-center">
                            {reviewemployee.rating}
                            <i className="ri-star-s-fill"></i>
                          </span>
                        </div>
                        <h6 className="mb-0">{reviewemployee.reviewText}</h6>
                      </div>
                    </div> : <></> }
                    {(reviewemployee.replyText && reviewemployee.isHide) === false && (
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
                          <h6 className="mb-0">{reviewemployee.replyText}</h6>
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </ListGroup>
            </form>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default TourGuideDetails;

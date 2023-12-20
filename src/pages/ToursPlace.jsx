import React, { useState, useEffect } from "react";
import "../style/tours-place.css";
import CommonSection from "../shared/CommonSection";
import SearchBar from "./../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import TourCard from "./../shared/TourCard";
import axios from "axios";
import PlaceCard from "./../shared/PlaceCard";

import { Container, Row, Col } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const ToursPlace = () => {
  const [listPlace, setListPlace] = useState([]);

  const getAllPlace = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/place/getAll?page=${page}`);
      setListPlace(res.data.data);
      const resAllPlace = await axios.get(`${BASE_URL}/place`);
      if (resAllPlace.status == 200) {
        const placeCount = resAllPlace.data.count;
        const pages = Math.ceil(placeCount / 12); // later we will use backend data count
        setPageCount(pages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: place,
    loading,
    error,
  } = useFetch(`${BASE_URL}/place/getAll?page=${page}`);
  // const { data: placeCount } = useFetch(
  //   `${BASE_URL}/place/search/getPlaceCount`
  // );

  useEffect(() => {
    getAllPlace();
    // const pages = Math.ceil(placeCount / 8);
    // setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <>
      <section className="toursplace__section">
        <Container>
          <Row>
            <Col lg="12">
              <h1>Địa điểm tour</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="container-fluid py-5 pt-0 toursplace__body mt-5">
        <div className="container py-5 pt-0">
          <div className="row">
            <section className="pt-0 col-lg-8">
              <Container>
                <Row>
                  {listPlace?.map((place) => (
                    <Col className="col-md-4 mb-4" key={place._id}>
                      <PlaceCard place={place} />
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col lg="12" className="center">
                    {!Array.isArray(listPlace) || listPlace.length === 0 ? (
                      <p className="text-center">Loading...</p>
                    ) : (
                      <div
                        className="pagination d-flex align-items-center 
                            justify-content-center mt-4 gap-3"
                      >
                        {[...Array(pageCount).keys()].map((number) => (
                          <span
                            key={number}
                            onClick={() => setPage(number)}
                            className={page === number ? "active__page" : ""}
                          >
                            {number + 1}
                          </span>
                        ))}
                      </div>
                    )}
                  </Col>
                </Row>
              </Container>
            </section>

            <div className="col-lg-4 mt-5 mt-lg-0">
              <div
                className="card text-center bg-white mb-5 py-5 px-4 flex-container"
                style={{ background: "white" }}
              >
                <img
                  src="../assets/images/user.jpg"
                  className="img-fluid mx-auto mb-3"
                  style={{ width: "100px" }}
                />
                <h3 className="mb-3" style={{ color: "#FAA935" }}>
                  Trương Hãy Yến
                </h3>
                <p>
                  Khoảnh khắc khi bạn đến được cái đích của chuyến đi, nhìn ngắm
                  mọi thứ xinh đẹp đang thu vào tầm mắt. Lúc đó bạn sẽ nhận ra
                  mọi sự nỗ lực của mình là vô cùng xứng đáng.
                </p>
                <div className="d-flex justify-content-center">
                  <a className="px-2" href="" style={{ color: "#FAA935" }}>
                    <i className="ri-facebook-circle-fill"></i>
                  </a>
                  <a className=" px-2" href="" style={{ color: "#FAA935" }}>
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a className=" px-2" href="" style={{ color: "#FAA935" }}>
                    <i className="ri-linkedin-fill"></i>
                  </a>
                  <a className=" px-2" href="" style={{ color: "#FAA935" }}>
                    <i className="ri-instagram-fill"></i>
                  </a>
                  <a className=" px-2" href="" style={{ color: "#FAA935" }}>
                    <i className="ri-youtube-fill"></i>
                  </a>
                </div>
              </div>
              <div className="mb-5">
                <div className="card bg-white" style={{ padding: "30px" }}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control p-4"
                      placeholder="Keyword"
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text border-orange-500  text-white"
                        style={{ backgroundColor: "#FAA935" }}
                      >
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-5 ">
                <h4
                  className="text-uppercase mb-4"
                  style={{ letterSpacing: "5px" }}
                >
                  THỂ LOẠI
                </h4>
                <div className="card bg-white" style={{ padding: "30px" }}>
                  <ul className="list-inline m-0">
                    <li className="mb-3 d-flex justify-content-between align-items-center">
                      <a className="text-dark" href="#">
                        <i className="fa fa-angle-right text-primary mr-2"></i>
                        Thiết kế web
                      </a>
                      <span
                        className="badge badge-primary badge-pill"
                        style={{ backgroundColor: "#FAA935" }}
                      >
                        150
                      </span>
                    </li>
                    <li className="mb-3 d-flex justify-content-between align-items-center">
                      <a className="text-dark" href="#">
                        <i className="fa fa-angle-right text-primary mr-2"></i>
                        Phát triển web
                      </a>
                      <span
                        className="badge badge-primary badge-pill"
                        style={{ backgroundColor: "#FAA935" }}
                      >
                        131
                      </span>
                    </li>
                    <li className="mb-3 d-flex justify-content-between align-items-center">
                      <a className="text-dark" href="#">
                        <i className="fa fa-angle-right text-primary mr-2"></i>
                        Tiếp thị trực tuyến
                      </a>
                      <span
                        className="badge badge-primary badge-pill"
                        style={{ backgroundColor: "#FAA935" }}
                      >
                        78
                      </span>
                    </li>
                    <li className="mb-3 d-flex justify-content-between align-items-center">
                      <a className="text-dark" href="#">
                        <i className="fa fa-angle-right text-primary mr-2"></i>
                        Tra cứu
                      </a>
                      <span
                        className="badge badge-primary badge-pill"
                        style={{ backgroundColor: "#FAA935" }}
                      >
                        56
                      </span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <a className="text-dark" href="#">
                        <i className="fa fa-angle-right text-primary mr-2"></i>
                        Tiếp thị qua email
                      </a>
                      <span
                        className="badge badge-primary badge-pill"
                        style={{ backgroundColor: "#FAA935" }}
                      >
                        98
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-5">
                <h4
                  className="text-uppercase mb-4"
                  style={{ letterSpacing: "5px" }}
                >
                  BÀI ĐĂNG MỚI NHẤT
                </h4>
                <a
                  className="d-flex align-items-center text-decoration-none bg-white mb-3"
                  href=""
                >
                  <img
                    className="img-fluid img_post"
                    src="../assets/images/destination-3.jpg"
                    alt=""
                    style={{ height: " 104px" }}
                  />
                  <div className="pl-3">
                    <h6 className="m-1">
                      Đi đâu không quan trọng, quan trọng là được đi cùng nhau.
                    </h6>
                    <small style={{ color: "#FAA935" }}>VN 01, 2023</small>
                  </div>
                </a>
                <a
                  className="d-flex align-items-center text-decoration-none bg-white mb-3"
                  href=""
                >
                  <img
                    className="img-fluid"
                    src="../assets/images/destination-2.jpg"
                    alt=""
                    style={{ height: " 104px" }}
                  />
                  <div className="pl-3">
                    <h6 className="m-1">
                      "Ai cũng phải đu di lịch để học hỏi"
                    </h6>
                    <small style={{ color: "#FAA935" }}>VN 01, 2023</small>
                  </div>
                </a>
                <a
                  className="d-flex align-items-center text-decoration-none bg-white mb-3"
                  href=""
                >
                  <img
                    className="img-fluid"
                    src="../assets/images/destination-1.jpg"
                    alt=""
                    style={{ height: " 104px" }}
                  />
                  <div className="pl-3">
                    <h6 className="m-1">
                      “Không gì giúp phát triển trí thông minh như là đi du
                      lịch”
                    </h6>
                    <small style={{ color: "#FAA935" }}>VN 01, 2023</small>
                  </div>
                </a>
              </div>
              <div className="mb-5">
                <h4
                  className="text-uppercase mb-4"
                  style={{ letterSpacing: "5px" }}
                >
                  GẮN THẺ
                </h4>
                <div className="d-flex flex-wrap m-n1">
                  <a href="" className="btn btn-light m-1 card">
                    Thiết kế
                  </a>
                  <a href="" className="btn btn-light m-1 card">
                    Phát triển
                  </a>
                  <a href="" className="btn btn-light m-1 card">
                    Tiếp thị
                  </a>
                  <a href="" className="btn btn-light m-1 card">
                    SEO
                  </a>
                  <a href="" className="btn btn-light m-1 card">
                    Văn bản
                  </a>
                  <a href="" className="btn btn-light m-1 card">
                    Tư vấn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};

export default ToursPlace;

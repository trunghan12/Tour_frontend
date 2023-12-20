import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import TourCard from "../shared/TourCard";
import EmployeeCard from "../shared/EmployeeCard";
import Subtitle from "./../shared/Subtitle";
import MasonryImagesGallery from "../components/image-gallery/MasonryImagesGallery";
import experienceImg from "../assets/images/experience.png";
import useFetch from "../hooks/useFetch";
import Testimonial from "../components/Testimonial/Testimonial";
import { BASE_URL } from "../utils/config";
import Newsletter from "../shared/Newsletter";
import "../style/tourguide.css";
import axios from "axios";

const TourGuide = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const [listEmployee, setListEmployee] = useState([]);

  const {
    data: employee,
    loading,
    error,
  } = useFetch(`${BASE_URL}/employee/getAll?page=${page}`);
  // const { data: listEmployee } = useFetch(`${BASE_URL}/employee`);

  const getAllEmployee = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/employee/getAll?page=${page}`);
      setListEmployee(res.data.data);
      const resAllemplloyee = await axios.get(`${BASE_URL}/employee`);
      if (resAllemplloyee.status == 200) {
        const emplloyeeCount = resAllemplloyee.data.count;
        const pages = Math.ceil(emplloyeeCount / 8); // later we will use backend data count
        setPageCount(pages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployee();
    window.scrollTo(0, 0);
  }, [page, employee]);
  return (
    <>
      <section className="toursGuide__section">
        <Container>
          <Row>
            <Col lg="12">
              <h1>Hướng dẫn viên</h1>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="pt-5">
        <Container>
          <div className="container header__tourguide">
            <div className="row">
              <h1 className="col-lg-12">
                Hướng dẫn viên{" "}
                <span style={{ color: "#FAA935" }}>thân thiện</span>
              </h1>
              <span className="slogan">
                "Biết rõ hơn, đặt chỗ tốt hơn, đi tốt hơn"
              </span>
            </div>
          </div>

          <Row>
            {listEmployee?.map((employee) => (
              <Col lg="3" md="6" sm="6" className="mb-4" key={employee._id}>
                <EmployeeCard employee={employee} />
                {/* <h1>{employee.name}</h1> */}
              </Col>
            ))}
          </Row>
          <Row>
            <Row>
              <Col lg="12">
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
              </Col>
            </Row>
          </Row>
        </Container>
      </section>

      {/* ====== experience tour section start ======= */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience_content">
                <Subtitle subtitle={"Kinh Nghiệm"} />

                <h2>
                  Với tất cả kinh nghiệm của chúng tôi <br /> 'chúng tôi sẽ phục
                  vụ bạn'
                </h2>
                <p>
                  Tận hưởng hạnh phúc cùng những chuyến đi.
                  <br />
                  Đến nơi bạn cảm thấy bình yên nhất.
                </p>
              </div>

              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>
                    Chuyến đi <br />
                    thành công
                  </h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>
                    Khách hàng <br />
                    thường xuyên
                  </h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>
                    Số năm <br />
                    kinh nghiệm
                  </h6>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ====== experience tour section end ======= */}

      {/* ====== gallery section start ======= */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Thư Viện"} />
              <h2 className="gallery__title">
                Ghé thăm thư viện ảnh tour du lịch của khách hàng của chúng tôi
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ====== gallery section end ======= */}

      {/* ====== testimonial section start ======= */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Người hâm mộ yêu thích"} />
              <h2 className="testimonial__title">
                Người hâm mộ nói gì về chúng tôi
              </h2>
            </Col>
            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ====== testimonial section end ======= */}

      <Newsletter />
    </>
  );
};

export default TourGuide;

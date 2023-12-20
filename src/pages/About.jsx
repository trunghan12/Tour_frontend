import CommonSection from "../shared/CommonSection";
import React, { useState, useEffect } from "react";

import "../style/about.css";
import Newsletter from "./../shared/Newsletter";
import Subtitle from "./../shared/Subtitle";
import Testimonial from "../components/Testimonial/Testimonial";
import axios from "axios";
import MasonryImagesGallery from "../components/image-gallery/MasonryImagesGallery";
import EmployeeCard from "../shared/EmployeeCard";
import { Container, Row, Col } from "reactstrap";
import { BASE_URL, BASE_PULIC } from "../utils/config";
import useFetch from "../hooks/useFetch";

export default function About() {
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
      <section className="about__section">
        <Container>
          <Row>
            <Col lg="12">
              <h1>Giới Thiệu Về Các Chuyến Tham Quan</h1>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <div className="container-xxl py-5">
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
                    src="../assets/images/tour-img05.jpg"
                    alt=""
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                <h6
                  className="section-title bg-white text-start pe-3"
                  style={{ font_size: "1rem" }}
                >
                  Về Chúng Tôi
                </h6>
                <h1 className="mb-4">
                  Chào mừng
                  <span className="text-color"> quý khách</span>
                </h1>
                <p className="mb-4 body__text">
                  Tour được tư vấn Tận Tâm, sắp xếp Cẩn Thận, tổ chức Chu Đáo,
                  phục vụ Nhiệt Tình bởi Thúy Hằng 0906 861 877 (Zalo) – Top 01
                  Kinh Doanh Pacific Travel. Đã nhận được rất nhiều Thư Khen
                  Ngợi Của Khách Hàng Khi có nhu cầu đi du lịch, xin đừng ngần
                  ngại hãy gọi ngay cho em Thúy Hằng 0906 861 877 để được tư vấn
                  chi tiết và báo giá ưu đãi nhất!
                </p>
                <p className="mb-4 body__text">
                  Công Ty Du Lịch Pacific Travel là công ty chuyên tổ chức tour
                  Vũng Tàu. Với đội ngũ nhân viên và hướng dẫn viên du lịch kinh
                  nghiệm lâu năm cùng với hệ thống dịch vụ cao cấp chuyên nghiệp
                  sẽ đưa đến cho quý khách trải nghiệm 1 tour du lịch ý nghĩa và
                  hài lòng nhất.
                </p>
                <div className="row gy-2 gx-4 mb-4 body__text">
                  <div className="col-sm-6">
                    <p className="mb-0">
                      <i className="fa fa-arrow-right text-color me-2"></i>5 Chỗ
                      ở cao cấp
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0">
                      <i className="fa fa-arrow-right text-color me-2"></i>
                      Dịch vụ 24/7
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0">
                      <i className="fa fa-arrow-right text-color me-2"></i>
                      Chuyến bay hạng nhất
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0">
                      <i className="fa fa-arrow-right text-color me-2"></i>
                      Xe mẫu mới nhất
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0">
                      <i className="fa fa-arrow-right text-color me-2"></i>150
                      tour du lịch thành phố cao cấp
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-0">
                      <i className="fa fa-arrow-right text-color me-2"></i>
                      Khách sạn được lựa chọn cẩn thận
                    </p>
                  </div>
                </div>
                <a
                  className="btn py-3 px-5 mt-2 text-white"
                  href=""
                  style={{ backgroundColor: "#FAA953" }}
                >
                  Đọc Thêm
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container-xxl py-5">
          <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
              <h6 className="section-title bg-white text-center text-color px-3">
                Hướng dẫn viên du lịch
              </h6>
              <h1 className="mb-5">Gặp gỡ hướng dẫn của chúng tôi</h1>
            </div>
            <Row>
              {listEmployee?.map((employee) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={employee._id}>
                  <EmployeeCard employee={employee} />
                  {/* <h1>{employee.name}</h1> */}
                </Col>
              ))}
            </Row>
            <Col lg="12" className="col-md-6 mb-4 pb-2">
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
          </div>
        </div>
      </section>

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
}

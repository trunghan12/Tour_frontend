import React, { useEffect } from "react";
import "../style/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";

import Subtitle from "./../shared/Subtitle";

import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/image-gallery/MasonryImagesGallery";
import Testimonial from "../components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* ========= hero section start ======== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center ">
                  <Subtitle subtitle={"Biết Trước Khi Bạn Đi"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Du lịch mở ra cơ hội tạo ra những
                  <span className="highlight"> kỷ niệm</span>
                </h1>
                <p>
                  Du lịch trong nước là một trong những tour du lịch được nhiều
                  du khách trong và ngoài nước lựa chọn. Các tour du lịch trong
                  nước không chỉ góp phần giới thiệu vẻ đẹp tự nhiên, văn hoá và
                  con người Việt Nam ra thế giới mà còn giúp bản thân những
                  người dân Việt hiểu rõ về quê hương, đất nước của mình hơn.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box hero__video-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>

            <SearchBar></SearchBar>
          </Row>
        </Container>
      </section>
      {/* ========= hero section end ======== */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">Những gì chúng tôi phục vụ</h5>
              <h2 className="services__title">
                Chúng tôi cung cấp dịch vụ tốt nhất của chúng tôi
              </h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/* ====== featured tour section start ======= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Khám Phá"} />
              <h2 className="featured__tour-title">
                Các tour du lịch nổi bật của chúng tôi
              </h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ====== featured tour section end ======= */}

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

export default Home;

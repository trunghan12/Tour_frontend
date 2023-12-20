import React, { useState, useEffect } from "react";
import { BASE_URL, BASE_PULIC } from "./../utils/config";
import Subtitle from "./../shared/Subtitle";
import { useParams } from "react-router-dom";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/FeaturedTourList";
import Newsletter from "../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import useFetch from "./../hooks/useFetch";
import "./toursplacedetail.css";

const ToursPlaceDetails = () => {
  const { id } = useParams();
  const { data: place, loading, error } = useFetch(`${BASE_URL}/place/${id}`);
  const { name, photo, description, introduction } = place;

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: placeCount } = useFetch(
    `${BASE_URL}/place/search/getPlaceCount`
  );
  //   const { totalRating, avgRating } = calculateAvgRating(reviews);
  console.log(place);

  useEffect(() => {
    const pages = Math.ceil(placeCount / 8); // later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [place]);

  return (
    <>
      <div className="container">
        <div className="container-fluid py-5">
          <div className="container pt-5">
            <div className="row">
              <div className="col-lg-4 ">
                <div
                  className="hero-wrap js-fullheight"
                  style={{
                    background_image:
                      "url('../assets/images/img-6.png') !important",
                    height: "438px",
                    background_position: "50% 125px",
                  }}
                  data-stellar-background-ratio="0.5"
                >
                  <div className="position-relative h-100 tour_place_admin">
                    <img
                      className="img-fluid position-absolute w-100 h-100 rounded-circle tour-place-details-img "
                      src={"../assets/images/team-2.jpg"}
                    />
                  </div>
                  <div className="overlay"></div>
                  <div
                    className="js-fullheight d-flex justify-content-center align-items-center"
                    style={{ height: "160px" }}
                  >
                    <div className="col-md-10 text text-center backgroun-admin">
                      <div className="desc">
                        <h2 className="subheading">Admin</h2>
                        <h1 className="mb-2" style={{ margin_top: "-3px" }}>
                          Nguyễn Văn Tú
                        </h1>
                        <p className="mb-4">
                          Tôi đã có kinh nghiệm tư vấn tour cho doanh nghiệp,
                          bằng việc thu thập những thông tin quan trọng về yêu
                          cầu của họ về địa điểm, hành trình và các điểm đến,
                          tôi đã lên kết hoạch cho họ về các hoạt động và sắp
                          xếp tổ chức thêm chương trình sinh hoạt nhóm phù hợp
                          với những chuyến đi cho các công ty.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 row">
                <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="tour-guide-details row">
                    <h1 className="mb-3">{name}</h1>
                    <h4 className="mb-3 tour-guide-details-intro">
                      Mô tả: <span>{description}</span>
                    </h4>
                  </div>
                  <div>
                    <div className="position-relative h-100 tour-img mb-4">
                      <img
                        className="img-fluid position-absolute w-100 h-100 tour-place-details-img "
                        src={`${BASE_PULIC}/${photo}`}
                        style={{ object_fit: "cover" }}
                      />
                    </div>
                    <div className="tour-guide-details-intro">
                      <h4 className="mb-3">
                        <p>{introduction}</p>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              {/* ========= hero section end ======== */}
              <section>
                <Container>
                  <Row>
                    <Col lg="3">
                      <h5 className="services__subtitle">
                        Những gì chúng tôi phục vụ
                      </h5>
                      <h2 className="services__title">
                        Chúng tôi cung cấp dịch vụ tốt nhất của chúng tôi
                      </h2>
                    </Col>
                    <ServiceList />
                  </Row>
                </Container>
              </section>

              {/* ====== featured tour section start ======= */}

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
              <div className="mb-4"></div>
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default ToursPlaceDetails;

import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";

import "../style/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import Newsletter from "./../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import axios from "axios";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tourList, setTourList] = useState([]);
  const [tourCommings, setTourCommings] = useState([]);
  const [headingTour, setHeadingTour] = useState("Các tour đang có lịch trình");

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/getAll?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);
  const { data: categoryList } = useFetch(
    `${BASE_URL}/category/getAll/statusIsTrue`
  );

  // const { data: tourCommings } = useFetch(
  //   `${BASE_URL}/tours/scheduled/getAllTourScheduled`
  // );

  useEffect(() => {
    getAllTourSchedule();

    const pages = Math.ceil(tourCount / 8); // later we will use backend data count
    setPageCount(pages);
    window.scrollTo(0, 0);
    setTourList(tours);
  }, [page, tourCount, tours, categoryList]);

  async function getAllTourSchedule() {
    try {
      const tourSchedule = await axios.get(
        `${BASE_URL}/tours/scheduled/getAllTourScheduled`
      );
      setTourCommings(tourSchedule.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getToursByCategoryid(categoryId) {
    try {
      const tourListResult = await axios.get(
        `${BASE_URL}/tours/getByCategoryId/` + categoryId
      );
      setTourList(tourListResult.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleClickInParent() {
    try {
      const tourSchedule = await axios.get(
        `${BASE_URL}/tours/scheduled/getAllTourScheduledInOneMonth`
      );
      setTourCommings(tourSchedule.data.data);
      setHeadingTour("Tour lịch trình trong tháng");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <CommonSection title={"Tất Cả Các Chuyến Tham Quan"} />
      <section>
        <Container>
          <SearchBar onClickInChild={handleClickInParent} />
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              <Col lg="3">
                <div className="navbar_tour">
                  <h5 className="text-center">Danh mục</h5>
                  <hr className="sidebar-divider my-0 br-color" />
                  <ul className="p-0 category">
                    {categoryList.map((category) => (
                      <li key={category._id}>
                        <a onClick={() => getToursByCategoryid(category._id)}>
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <hr className="sidebar-divider my-0 br-color" />
                </div>
              </Col>
              <Col lg="9">
                <h1>{headingTour}</h1>
                <Row>
                  {tourCommings?.map((tour) => (
                    <Col lg="4" md="6" sm="6" className="mb-4" key={tour._id}>
                      <TourCard tour={tour} />
                    </Col>
                  ))}
                </Row>

                <h1>Tất cả các tour</h1>
                <Row>
                  {tourList?.map((tour) => (
                    <Col lg="4" md="6" sm="6" className="mb-4" key={tour._id}>
                      <TourCard tour={tour} />
                    </Col>
                  ))}
                  {tourList.length == 0 ? <h1>Không tồn tại tour</h1> : ""}
                </Row>
              </Col>
              <Col lg="3"></Col>
              <Col lg="9">
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
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;

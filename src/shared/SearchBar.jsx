import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Row } from "reactstrap";

import { BASE_URL } from "./../utils/config";

import { useNavigate } from "react-router-dom";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SearchBar = (props) => {
  const navigate = useNavigate();
  const [searchTour, setSearchTour] = useState("");

  const searchHandler = async () => {
    if (!searchTour) {
      return toast.error("Vui lòng nhập từ khóa tìm kiếm tour");
    }

    try {
      const res = await axios(
        `${BASE_URL}/tours/search/getTourByName?s=${searchTour}`
      );

      if (res.status == 200) {
        navigate(`/tours/search?s=${searchTour}`, { state: res.data.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function handleClickInParent() {
    try {
      const tourSchedule = await axios.get(
        `${BASE_URL}/tours/scheduled/getAllTourScheduledInOneMonth`
      );
      if (tourSchedule.status == 200) {
        navigate(`/tours/search?s=${""}`, { state: tourSchedule.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Row>
      <Col lg="6">
        <ToastContainer />
        <div className="search__bar">
          <Form className="d-flex align-items-center gap-4">
            <FormGroup className="d-flex gap-3 form__group form__group-fast">
              <span className="d-flex align-items-center">
                <i className="ri-map-pin-line"></i>
              </span>
              <div>
                <h6>Tên tour</h6>
                <input
                  type="text"
                  placeholder="Bạn đi đâu?"
                  value={searchTour}
                  onChange={(e) => setSearchTour(e.target.value)}
                />
              </div>
            </FormGroup>
            <span
              className="search__icon"
              type="submit"
              onClick={searchHandler}
            >
              <i className="ri-search-line"></i>
            </span>
          </Form>
        </div>
      </Col>
      <Col lg="6">
        <div className="search__bar">
          <button
            onClick={handleClickInParent}
            className="btn btn-warning text-white"
          >
            Các Tour có lịch trình trong tháng sau
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default SearchBar;

import React, { useState } from "react";

import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useLocation } from "react-router-dom";
import TourCard from "./../shared/TourCard";

import Newsletter from "../shared/Newsletter";
import SearchBar from "../shared/SearchBar";

const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);
  console.log(location.search);

  return (
    <>
      <CommonSection title={"Kết quả tìm kiếm của tour"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4>Tour không tồn tại</h4>
            ) : (
              data?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;

import React from "react";
import "./newsletter.css";

import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>
                Đăng ký ngay để nhận được những thông tin du lịch hữu ích.
              </h2>

              <div className="newsletter__input">
                <input type="email" placeholder="Nhập email của bạn" />
                <button className="btn newsletter__btn">Đăng Ký</button>
              </div>

              <p>
                Đối với những bình luận góp ý về những điểm chưa hoàn thiện
                trong chất lượng dịch vụ của khách hàng luôn được công ty chúng
                đón tôi đón nhận và cải thiện những thiếu sót đã được góp ý để
                chất lượng dịch vụ của công ty ngày một tốt hơn.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;

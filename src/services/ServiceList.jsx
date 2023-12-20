import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Tính Thời Tiết",
    desc: "Hôm nay thời tiết các tỉnh miền Nam bầu trời trong xanh nắng đẹp này khả năng kéo dài thêm vài ngày nữa",
  },
  {
    imgUrl: guideImg,
    title: "Hướng Dẫn Viên Du Lịch Tốt Nhất",
    desc: "HDV sẽ phục vụ nhu cầu quý khách sắp xếp các bữa ăn và đồng hành suốt chuyến đi",
  },
  {
    imgUrl: customizationImg,
    title: "Tùy Chỉnh",
    desc: "Tiện ích này cung cấp nhiều giao diện tương ứng với cách sắp xếp tổ chức khác nhau mà bạn có thể lựa chọn.",
  },
];

const ServiceList = () => {
  return (
    <>
      {" "}
      {servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />{" "}
        </Col>
      ))}{" "}
    </>
  );
};

export default ServiceList;

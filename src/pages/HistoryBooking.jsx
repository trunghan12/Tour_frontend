import React, { useState, useEffect, useContext } from "react";
import Newsletter from "../shared/Newsletter";
import Subtitle from "./../shared/Subtitle";
import Testimonial from "../components/Testimonial/Testimonial";
import { BASE_URL, BASE_PULIC } from "./../utils/config";
import { useParams } from "react-router-dom";
import useFetch from "./../hooks/useFetch";
import axios from "axios";
import "../style/history-booking.css";
import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const HistoryBooking = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [listBooking, setListBooking] = useState([]);
  const [idBooking, setIdBooking] = useState("");

  const { user } = useContext(AuthContext);
  let i = 1;

  useEffect(() => {
    getAllListBookingByCurrentUser();
  });

  async function getAllListBookingByCurrentUser() {
    const res = await axios.get(
      `${BASE_URL}/booking/getAllBookingUserId/${user._id}`
    );
    setListBooking(res.data.data);
  }

  function handleDisplayModalDelete(id) {
    setShowModal(true);
    setIdBooking(id);
  }

  function close() {
    setShowModal(false);
  }

  async function handleDeleteBooking() {
    setShowModal(false);
    try {
      const data = {
        status: -1,
      };
      const res = await axios.put(`${BASE_URL}/booking/${idBooking}`, data, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status == 200) {
        toast.success("Hủy booking Tour thành công");
        const newListBooking = listBooking.map((booking) =>
          booking._id === id ? { ...booking, status: -1 } : booking
        );
        setListBooking(newListBooking);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section>
        <Container>
          <ToastContainer />
          <Row className=" header_history">
            <Col lg="12" className="m-auto">
              <h2>Lịch sử đặt tour</h2>
              <table>
                <tr>
                  <th scope="col">#</th>
                  <th width="300">Tour</th>
                  <th>Ngày khởi hành</th>
                  <th>Ngày kết thúc</th>
                  <th>Số vé</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th width="250">Tình trạng</th>
                </tr>
                {listBooking?.map((booking) => (
                  <tr>
                    <th scope="row">{i++}</th>
                    <td>{booking.tourName}</td>
                    <td>{moment(booking.startDate).format("YYYY-MM-DD")}</td>
                    <td>{moment(booking.endDate).format("YYYY-MM-DD")}</td>
                    <td>
                      <p>{booking.guestSize_Child} vé trẻ em</p>
                      <p>{booking.guestSize} vé người lớn</p>
                    </td>
                    <td>{booking.totalPrice}.000 vnd</td>
                    <td>thanh toán thành công</td>
                    <td>
                      {(!booking.status || booking.status === 0) && (
                        <>
                          <p className="btn btn-warning mt-3">Đang chờ duyệt</p>
                          <button
                            onClick={() =>
                              handleDisplayModalDelete(booking._id)
                            }
                            className="btn btn-danger ml-2"
                          >
                            Hủy chờ
                          </button>
                        </>
                      )}
                      {(booking.status && booking.status) === -1 && (
                        <p className="btn btn-danger ml-2">Đã hủy</p>
                      )}
                      {(booking.status && booking.status) === 1 && (
                        <p className="btn btn__success ml-2">Đã duyệt</p>
                      )}
                    </td>
                  </tr>
                ))}
              </table>
            </Col>
          </Row>
        </Container>
      </section>

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
      <section id="booking-history"></section>

      <Modal show={showModal} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có chắc chắn xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end">
            <button onClick={close} className="btn btn-primary">
              Không
            </button>
            <button
              onClick={handleDeleteBooking}
              className="btn btn-danger ml-3"
            >
              Chắc chắn
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HistoryBooking;

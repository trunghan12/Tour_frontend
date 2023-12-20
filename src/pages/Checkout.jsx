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
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Button, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../style/checkout.css";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [tour, setTour] = useState({});
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: "",
    tourId: id,
    fullName: "",
    phone: "",
    guestSize: "",
    guestSize_Child: "",
    bookAt: new Date(),
    startDate: tour.start_date ? tour.start_date : "",
    startEnd: tour.end_date ? tour.end_date : "",
    totalPrice: 0,
    addressDetail: "",
    note: "",
  });

  const handleChage = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  function handleChangeGuestSize(e) {
    const guestSize = e.target.value;
    const regularExpression = /^\d+$/;
    if (guestSize < 1 || !regularExpression.test(guestSize)) {
      toast.error("Vui lòng nhập đúng định dạng");
      setBooking((prev) => ({ ...prev, guestSize: "" }));
    } else {
      if (guestSize > tour.maxGroupSize) {
        toast.error("Số lượng vượt quá mức");
        setBooking((prev) => ({ ...prev, guestSize: "" }));
      } else {
        setBooking((prev) => ({ ...prev, guestSize: guestSize }));
      }
    }
    setBooking((prev) => ({
      ...prev,
    }));
  }

  function handleChangeGuestSize_Child(e) {
    const guestSize_Child = e.target.value;
    const regularExpression = /^\d+$/;
    if (guestSize_Child < 0 || !regularExpression.test(guestSize_Child)) {
      toast.error("Vui lòng nhập đúng định dạng");
    } else {
      if (guestSize_Child > tour.maxGroupSize_chidlren) {
        toast.error("Số lượng vượt quá mức");
        setBooking((prev) => ({ ...prev, guestSize_Child: "" }));
      } else {
        setBooking((prev) => ({ ...prev, guestSize_Child: guestSize_Child }));
      }
    }
    setBooking((prev) => ({
      ...prev,
    }));
  }

  const serviceFee = 50;
  const totalAmount =
    Number(tour.price) * Number(booking.guestSize) +
    Number(serviceFee) +
    Number(tour.price_children) * Number(booking.guestSize_Child);

  function validationBooking() {
    //username
    if (!booking.fullName) {
      return toast.error("Vui lòng nhập họ tên");
    }
    //phone
    const vietnamPhoneRegex = /^(0|\+84)[-.\s]?([1-9][0-9]{8}|[1-9][0-9]{10})$/;
    if (!booking.phone) {
      return toast.error("Vui lòng nhập số điện thoại");
    } else if (!vietnamPhoneRegex.test(booking.phone)) {
      return toast.error("Số điện thoại nhập sai định dạng");
    }
    //guestSize
    if (!booking.guestSize) {
      return toast.error("Vui lòng nhập số lượng vé người lớn");
    }
    return true;
  }

  // send data to the server
  const handleClick = async (e) => {
    let isSubmit = true;
    isSubmit = validationBooking();
    e.preventDefault();
    if (isSubmit === true) {
      try {
        if (!user || user === undefined || user === null) {
          // return alert("Plase sign in");
          return toast.error("Vui lòng đăng nhập tài khoản");
        }
        const bookingData = {
          ...booking,
          totalPrice: totalAmount,
        };
        const res = await fetch(`${BASE_URL}/booking`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(bookingData),
        });
        const result = await res.json();
        console.log(result);
        if (!res.ok) {
          return toast.error(result.message);
        } else {
          if (booking.guestSize) {
            console.log("guestSize");
            console.log(
              parseInt(tour.maxGroupSize) - parseInt(booking.guestSize)
            );
            await axios.put(
              `${BASE_URL}/tours/${id}`,
              {
                maxGroupSize:
                  parseInt(tour.maxGroupSize) - parseInt(booking.guestSize),
              },
              {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );
          }

          if (booking.guestSize_Child) {
            console.log("guestSize child");
            console.log(
              parseInt(tour.maxGroupSize_chidlren) -
                parseInt(booking.guestSize_Child)
            );
            await axios.put(
              `${BASE_URL}/tours/${id}`,
              {
                maxGroupSize_chidlren:
                  parseInt(tour.maxGroupSize_chidlren) -
                  parseInt(booking.guestSize_Child),
              },
              {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );
          }

          const resCheckStatistical = await axios(
            `${BASE_URL}/statistical/checkStaticticalExist`
          );
          if (resCheckStatistical.status == 200) {
            const dataCheckStatistical = await resCheckStatistical.data;
            if (dataCheckStatistical.length > 0) {
              //update record
              const recordStatistical = await dataCheckStatistical.data[0];
              const newObjectStatistical = {
                sales: Number(recordStatistical.sales * 1 + totalAmount * 1),
                profit: Number(
                  recordStatistical.profit * 1 +
                    Number((totalAmount / 100) * 15) * 1
                ),
                total_booking: Number(recordStatistical.total_booking * 1 + 1),
              };

              const resUpdateStatistical = await axios.put(
                `${BASE_URL}/statistical/${recordStatistical._id}`,
                newObjectStatistical,
                {
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                }
              );
            } else {
              // new create record
              const newObjectStatistical = {
                order_date: new Date().toLocaleDateString("en-CA"),
                sales: totalAmount,
                profit: Number((totalAmount / 100) * 15),
                total_booking: 1,
              };

              const resUpdateStatistical = await axios.post(
                `${BASE_URL}/statistical`,
                newObjectStatistical,
                {
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                }
              );
            }
          }
          navigate("/history");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleTourById();
  }, []);

  async function getSingleTourById() {
    try {
      const res = await axios.get(`${BASE_URL}/tours/` + id);
      setTour(res.data.data);
      const data = await res.data;
      const dataDetail = await data.data;
      setBooking((prev) => ({ ...prev, tourName: dataDetail.title }));
      setBooking((prev) => ({ ...prev, startDate: dataDetail.start_date }));
      setBooking((prev) => ({ ...prev, startEnd: dataDetail.end_date }));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <ToastContainer />
      <Container>
        <Row>
          <div className="mb-2 py-3 row">
            <div className="col-md-6 mb-2">
              <h2 className="m-0 font-weight-bold text-left ">
                Thông tin thanh toán
              </h2>
            </div>

            <hr />
          </div>
          <div className=" col-md-8">
            <div className=" mb-4 row card-paypay ">
              <form action="" className="row">
                <div className="card-body">
                  <div className="form-group form-1">
                    <label for="name">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      required
                      onChange={handleChage}
                      value={booking.fullName}
                    />
                  </div>
                </div>
                <div className="card-body col-md-6">
                  <div className="form-group form-1">
                    <label>Số lượng vé người lớn</label>
                    <input
                      type="text"
                      className="form-control"
                      value={booking.guestSize}
                      onChange={(e) => handleChangeGuestSize(e)}
                    />
                  </div>
                </div>
                <div className="card-body col-md-6">
                  <div className="form-group form-1">
                    <label>Số lượng vé trẻ em</label>
                    <input
                      type="text"
                      className="form-control"
                      value={booking.guestSize_Child}
                      onChange={(e) => handleChangeGuestSize_Child(e)}
                    />
                  </div>
                </div>
                <div className="card-body col-md-6">
                  <div className="form-group form-1">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="userEmail"
                      required
                      onChange={handleChage}
                      value={booking.userEmail}
                    />
                  </div>
                </div>
                <div className="card-body col-md-6">
                  <div className="form-group form-1">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      onChange={handleChage}
                      value={booking.phone}
                    />
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group form-1">
                    <label>Địa chỉ chi tiết</label>
                    <input
                      type="text"
                      className="form-control"
                      id="addressDetail"
                      onChange={handleChage}
                      value={booking.addressDetail}
                    />
                  </div>
                </div>
                <div className="card-body ">
                  <div className="form-group form-1">
                    <label>Ghi chú</label>
                    <div className="input-group mb-3">
                      <textarea
                        className="form-control"
                        aria-label="With textarea"
                        id="note"
                        onChange={handleChage}
                        value={booking.note}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className=" col-md-4">
            <div className="booking__top d-flex align-items-center justify-content-between"></div>
            {/* ============== booking form ============= */}
            <div className=" mb-4 row bg-card-pay">
              <div className="row card-pay">
                <div className="card-body ">
                  <h3 className="m-0 font-weight-bold"> Tour đã đặt </h3>
                  <hr />
                </div>
                <div className="col-md-12 mb-2 ">
                  <h5 className="m-0 font-weight-bold">Tên tour</h5>
                </div>
                <div className="col-md-12">
                  {tour && tour.title && <p className="mb-0">{tour.title}</p>}
                </div>
                <div>
                  <hr />
                </div>
                <div className="col-md-8 mb-2 ">
                  <h5 className="m-0 font-weight-bold">Số vé</h5>
                </div>
                <div className="col-md-4 mb-2 text-center">
                  <h5 className="m-0 font-weight-bold">Giá tiền</h5>
                </div>

                <div className="col-md-8">
                  <p>
                    {booking.guestSize} Vé người lớn x {tour.price}.000 vnd
                  </p>
                  <p>
                    {booking.guestSize_Child} Vé trẻ em x {tour.price_children}
                    .000 vnd
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <p>{Number(tour.price * booking.guestSize)}.000 vnd</p>
                  <p>
                    {Number(tour.price_children * booking.guestSize_Child)}.000
                    vnd
                  </p>
                </div>
                <div>
                  <hr />
                </div>
                <div className="col-md-12  ">
                  <p>
                    Phí dịch vụ
                    <span className="float-right"> {serviceFee}.000 vnd</span>
                  </p>
                  <h5 className="m-0 font-weight-bold">
                    Tổng tiền
                    <span className="float-right">{totalAmount}.000 vnd</span>
                  </h5>
                </div>
                {/* <div className="col-md-6  text-center ">
                  <h5
                    className="m-0 font-weight-bold "
                    style={{ color: "red" }}
                  >
                     {totalAmount} vnd
                  </h5>
                </div> */}
                <div>
                  <hr />
                </div>
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                  <label className="form-check-label" for="flexRadioDefault1">
                    Thanh toán khi lấy vé
                  </label>
                </div> */}
                {/* <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    Thanh toán online
                  </label>
                </div> */}
                <div className="text-center mb-3 mt-1">
                  <Button onClick={handleClick} className="btn primary__btn">
                    Thanh toán
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <Newsletter />
    </section>
  );
};

export default Checkout;

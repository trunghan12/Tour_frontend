import React, { useState, useEffect, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import moment from "moment/moment";
import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const [isSchedule, setIsSchedule] = useState(false);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    tourId: tour._id,
    fullName: "",
    phone: "",
    guestSize: "",
    guestSize_Child: "",
    bookAt: new Date(),
    startDate: tour.start_date ? tour.start_date : "",
    startEnd: tour.end_date ? tour.end_date : "",
    totalPrice: 0,
  });

  useEffect(() => {
    checkScheduleTour();
  }, []);

  function checkScheduleTour() {
    if (!tour.start_date || !tour.end_date) {
      setIsSchedule(false);
    }

    const nowDate = new Date();
    const startDate = new Date(tour.start_date);
    if (nowDate < startDate) {
      setIsSchedule(true);
    }
  }

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
    if (guestSize_Child < 1 || !regularExpression.test(guestSize_Child)) {
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

  const serviceFee = 50000;
  const totalAmount =
    Number(price) * Number(booking.guestSize) +
    Number(serviceFee) +
    Number(tour.price_children) * Number(booking.guestSize_Child);

  function validationBooking() {
    //username
    if (!booking.fullName) {
      return toast.error("Vui lòng nhập họ tên");
    }
    //phone
    if (!booking.phone) {
      return toast.error("Vui lòng nhập số điện thoại");
    }
    //guestSize
    if (!booking.guestSize) {
      return toast.error("Vui lòng nhập số lượng vé người lớn");
    }
    return true;
  }

  function handleClickCheckout() {
    navigate("/checkout/" + tour._id);
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
        if (!res.ok) {
          return toast.error(result.message);
        } else {
          navigate("/checkout");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between"></div>
      {/* ============== booking form ============= */}
      <div className="booking__form">
        <h5> Thông tin </h5>
        <span className="tour__rating d-flex align-items-center ">
          <i className="ri-star-fill"> </i> {avgRating === 0 ? null : avgRating}
          ({reviews?.length})
        </span>
      </div>
      {/* ============== booking form end ============= */}
      <div className="booking__bottom">
        <ListGroup>
          {tour.price_children && (
            <ul className="p-0 mb-3">
              <li className="font-weight-bold mb-3">
                Tên tour
                <span className="float-right">{tour.title}</span>
              </li>
              <li className="font-weight-bold mb-3">
                Số vé người lớn
                <span className="float-right">{tour.maxGroupSize} vé</span>
              </li>
              <li className="font-weight-bold mb-3">
                Giá vé người lớn
                <span className="float-right">{tour.price}.000 vnđ</span>
              </li>
              <li className="font-weight-bold mb-3">
                Số vé trẻ em
                <span className="float-right">
                  {tour.maxGroupSize_chidlren} vé
                </span>
              </li>
              <li className="font-weight-bold mb-3">
                Giá vé trẻ em
                <span className="float-right">
                  {tour.price_children}.000 vnđ
                </span>
              </li>
              <li className="font-weight-bold mb-3">
                Ngày khởi hành
                <span className="float-right">
                  {moment(tour.start_date).format("DD-MM-YYYY")}
                </span>
              </li>
              <li className="font-weight-bold mb-3">
                Ngày kết thúc
                <span className="float-right">
                  {moment(tour.end_date).format("DD-MM-YYYY")}
                </span>
              </li>
            </ul>
          )}
        </ListGroup>
        {isSchedule ? (
          <Button
            className="btn primary__btn w-100 mt-4"
            onClick={handleClickCheckout}
          >
            Đặt ngay
          </Button>
        ) : (
          <Button
            className="btn primary__btn w-100 mt-4 disable__button"
            onClick={() => toast.error("Tour hiện tại không có lịch trình")}
          >
            Đặt ngay
          </Button>
        )}
      </div>
    </div>
  );
};

export default Booking;

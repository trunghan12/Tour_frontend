import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, BASE_PULIC } from "../../../../utils/config";
import { Modal } from "react-bootstrap";
import moment from "moment/moment";
import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";

import "./listbooktour.css";
export default function ListEmplyee() {
  const [listBooking, setListBooking] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState("");
  const [listTourSchedule, setListTourSchedule] = useState([]);
  const [tourScheduleChoose, setTourScheduleChoose] = useState("");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getAllBooking();
    getAllTourSchedule();
  }, [page]);

  const getAllBooking = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/booking/getAll?page=` + page);
      setListBooking(res.data.data);

      const resAllBooking = await axios.get(`${BASE_URL}/booking`);
      if (resAllBooking.status == 200) {
        const bookingCount = resAllBooking.data.count;
        const pages = Math.ceil(bookingCount / 8); // later we will use backend data count
        setPageCount(pages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTourSchedule = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/tours/scheduled/getAllTourScheduled`
      );
      setListTourSchedule(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function close() {
    setShowModal(false);
  }

  async function handleCheckBooking(id) {
    const data = {
      isCheck: true,
    };

    try {
      const res = await axios.put(`${BASE_URL}/booking/${id}`, data, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status == 200) {
        const newListBooking = listBooking.map((booking) =>
          booking._id === id ? { ...booking, isCheck: true } : booking
        );
        setListBooking(newListBooking);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleApprovedBooking(id) {
    const data = {
      status: 1,
    };

    try {
      const res = await axios.put(`${BASE_URL}/booking/${id}`, data, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status == 200) {
        toast.success("Duyệt booking Tour thành công");
        const newListBooking = listBooking.map((booking) =>
          booking._id === id ? { ...booking, status: 1 } : booking
        );
        setListBooking(newListBooking);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilterTourSchedule(e) {
    setTourScheduleChoose(e.target.value);

    if (e.target.value) {
      try {
        const tourId = e.target.value;
        if (tourId === "1") {
          const res = await axios.get(`${BASE_URL}/booking`);
          setListBooking(res.data.data);
        } else {
          const res = await axios.get(
            `${BASE_URL}/booking/getAllBookingTour/` + tourId
          );
          setListBooking(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  let i = 0;

  return (
    <div className="container">
      <h1 className="text-center mb-4">Danh sách đặt vé</h1>
      <ToastContainer />
      <div className="row">
        <div className="d-flex justify-content header__list mb-2">
          <label className="font-weight-bold primary__btn">
            Tour đang có lịch
          </label>
        </div>
        <div className="d-flex col-lg-6 justify-content header__list mb-4">
          <select
            onChange={(e) => handleFilterTourSchedule(e)}
            value={tourScheduleChoose}
            className="form-control search__btn"
          >
            <option className="search__btn" value="1">
              Tất cả Tour
            </option>
            {listTourSchedule &&
              listTourSchedule.map((tourSchedule) => (
                <option key={tourSchedule._id} value={tourSchedule._id}>
                  {tourSchedule.title}
                </option>
              ))}
          </select>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th width="166" scope="col">
              Tên hướng dẫn viên
            </th>
            <th scope="col">Email</th>
            <th scope="col">Tour</th>
            <th scope="col">Ngày khởi hành</th>
            <th scope="col">Ngày kết thúc</th>
            <th scope="col">Tổng tiền</th>
            <th scope="col">Số lượng vé</th>
            <th scope="col">Số vé trẻ em</th>
            <th width="140" scope="col">
              Quản lý
            </th>
          </tr>
        </thead>
        <tbody>
          {listBooking &&
            Array.isArray(listBooking) &&
            listBooking.reverse().map((booking) => {
              i++;
              return (
                <tr key={booking._id}>
                  <th scope="row">{i}</th>
                  <td>{booking.fullName}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.tourName}</td>
                  <td>{moment(booking.startDate).format("YYYY-MM-DD")}</td>
                  <td>{moment(booking.endDate).format("YYYY-MM-DD")}</td>
                  <td>{booking.totalPrice} vnđ</td>
                  <td>{booking.guestSize}</td>
                  <td>{booking.guestSize_Child}</td>
                  <td>
                    {(!booking.status || booking.status == 0) && (
                      <button
                        onClick={() => handleApprovedBooking(booking._id)}
                        className="btn btn-warning ml-2"
                      >
                        Duyệt
                      </button>
                    )}
                    {booking.status && booking.status === 1 ? (
                      <button disabled className="btn btn__success ml-2">
                        Đã duyệt
                      </button>
                    ) : (
                      <></>
                    )}
                    {booking.status && booking.status === -1 ? (
                      <button className="btn btn-danger ml-2">Đã hủy</button>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {!Array.isArray(listBooking) || listBooking.length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
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
      )}
    </div>
  );
}

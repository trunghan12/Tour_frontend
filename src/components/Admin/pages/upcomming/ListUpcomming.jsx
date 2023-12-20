import { NavLink, useNavigate } from "react-router-dom";
import "./ListUpcomming.css";
import { useState, useEffect } from "react";
import { BASE_URL, BASE_PULIC } from "../../../../utils/config";
import axios from "axios";
import moment from "moment";
import { Modal } from "react-bootstrap";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListUpcomming() {
  const [listTourComming, setListTourComming] = useState([]);
  const [listEmployeeComming, setListEmployeeComming] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idTour, setIdTour] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [search, setSearch] = useState("");

  const navigation = useNavigate();

  useEffect(() => {
    getAllTourComming();
  }, []);

  async function getAllTourComming() {
    try {
      const res = await axios.get(
        `${BASE_URL}/tours/scheduled/getAllTourScheduled`
      );
      setListTourComming(res.data.data);
      const listEmployeeComming = await axios.get(`${BASE_URL}/employee`);

      setListEmployeeComming(listEmployeeComming.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  function close() {
    setShowModal(false);
  }

  function displayEmployee(employee_id) {
    const employeeResult = listEmployeeComming.find(
      (employee) => employee._id === employee_id
    );
    if (employeeResult) {
      return employeeResult.name;
    } else {
      return "";
    }
  }

  function handleDisplayModalDelete(id) {
    setShowModal(true);
    setIdTour(id);
  }

  async function handleDeleteCategory() {
    setShowModal(false);
    const data = {
      start_date: null,
      end_date: null,
      maxGroupSize_chidlren: 0,
      price_children: 0,
    };
    try {
      const res = await axios.put(`${BASE_URL}/tours/${idTour}`, data, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status === 200) {
        const newListTour = listTourComming.filter(
          (tour) => tour._id !== idTour
        );
        setListTourComming(newListTour);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSearchTourSchedule() {
    if (!search) {
      return toast.error("Bạn chưa nhập key search");
    }

    try {
      const res = await axios.get(
        `${BASE_URL}/tours/searchTourSchedule/getTourScheduleByName?s=` + search
      );
      if (res.status == 200) {
        setListTourComming(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleProcessBeforeUpdate(tour_id, start_date) {
    //so sanh ngay cap nhat
    // const startDate = moment(new Date(start_date));
    // // const nowDate =  new Date();
    // const currentDate = moment();

    // // Thêm 1 ngày vào đối tượng Moment
    // const currentDatePlus10Date = currentDate.add(10, 'days');
    // console.log(currentDatePlus10Date)
    // if(startDate.isBefore(currentDatePlus10Date)){
    //   // toast.error('Rất gần ngày diễn ra Tour nên không thể cập nhật')
    //   console.log('Rat gan ngay dien ra Tour')
    // }else{
    //   // navigation(`/admin/update-upcoming/${tour_id}`)
    //   console.log('Co the cap nhat')
    // }

    const currentDate = new Date(); //Ngay hien tai
    const futureDateAdd10 = new Date(currentDate);
    futureDateAdd10.setDate(currentDate.getDate() + 1);

    const startDate = new Date(start_date);

    if (startDate < futureDateAdd10) {
      return toast.error("Rất gần ngày diễn ra Tour nên không thể cập nhật");
    } else {
      navigation(`/admin/update-upcoming/${tour_id}`);
    }
  }

  let i = 0;
  return (
    <>
      <div className="container">
        <h1 className="text-center">Danh sách tour sắp diễn ra</h1>
        <ToastContainer />
        <div className="d-flex justify-content-between header__list">
          <div className="d-flex justify-content-end mb-4">
            <NavLink className="btn primary__btn" to="../create-upcomming-tour">
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Thiết lập
              tour
            </NavLink>
          </div>
          <div>
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3 "
            >
              <i className="fa fa-bars"></i>
            </button>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control bg-light small search__btn"
                  placeholder="Tìm kiếm..."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                  <button
                    onClick={handleSearchTourSchedule}
                    className="btn primary__btn"
                    type="button"
                  >
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên tour</th>
              <th scope="col">Hướng dẫn viên</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Ngày bắt đầu</th>
              <th scope="col">Ngày kết thúc</th>
              <th scope="col">Số vé người lớn</th>
              <th scope="col">Số vé trẻ em</th>
              <th width="120" scope="col">
                Quản lý
              </th>
            </tr>
          </thead>
          <tbody>
            {listTourComming &&
              Array.isArray(listTourComming) &&
              listTourComming.reverse().map((tour) => {
                i++;
                return (
                  <tr key={tour._id}>
                    <th scope="row">{i}</th>
                    <td>{tour.title}</td>

                    <td>{displayEmployee(tour.employee_id)}</td>

                    <td>
                      <div className="cover-image">
                        <img
                          className="image-item"
                          src={`${BASE_PULIC}/${tour.photo}`}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{moment(tour.start_date).format("YYYY-MM-DD")}</td>
                    <td>{moment(tour.end_date).format("YYYY-MM-DD")}</td>
                    <td>{tour.maxGroupSize}</td>
                    <td>{tour.maxGroupSize_chidlren}</td>
                    <td>
                      {/* <NavLink
                        to={`/admin/update-upcoming/${tour._id}`}
                        className="btn btn__warning text-white"
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </NavLink> */}
                      <button
                        onClick={() =>
                          handleProcessBeforeUpdate(tour._id, tour.start_date)
                        }
                        className="btn btn__warning text-white"
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button
                        onClick={() => handleDisplayModalDelete(tour._id)}
                        className="btn btn-danger ml-2"
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {!Array.isArray(listTourComming) || listTourComming.length === 0 ? (
          <p className="text-center">Loading...</p>
        ) : (
          <p></p>
        )}
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
                onClick={handleDeleteCategory}
                className="btn btn-danger ml-3"
              >
                Chắc chắn
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

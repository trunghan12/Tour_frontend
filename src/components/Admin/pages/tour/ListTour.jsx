import { NavLink } from "react-router-dom";
import "./ListTour.css";
import { useState, useEffect } from "react";
import { BASE_URL, BASE_PULIC } from "../../../../utils/config";
import axios from "axios";
import { Modal, Badge } from "react-bootstrap";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListTour() {
  const [listTour, setListTour] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idTour, setIdTour] = useState("");
  const [listCategory, setListCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [listEmployeeComming, setListEmployeeComming] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  async function getAllTour() {
    try {
      const res = await axios.get(`${BASE_URL}/tours/getAll?page=` + page);
      const resCategory = await axios.get(`${BASE_URL}/category`);
      const resAllTour = await axios.get(`${BASE_URL}/tours`);
      const listEmployeeComming = await axios.get(`${BASE_URL}/employee`);
      if (resAllTour.status == 200) {
        const tourCount = resAllTour.data.count;
        const pages = Math.ceil(tourCount / 8); // later we will use backend data count
        setPageCount(pages);
      }
      setListEmployeeComming(listEmployeeComming.data.data);
      setListCategory(resCategory.data.data);
      setListTour(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTour();
  }, [page]);

  let i = 0;

  function displayCategory(category_id) {
    const catResult = listCategory.find((cat) => cat._id === category_id);
    if (catResult) {
      return catResult.name;
    } else {
      return "";
    }
  }

  function displayEmployee(employee_id) {
    const employeeResult = listEmployeeComming.find(
      (employee) => employee._id === employee_id
    );
    if (employeeResult) {
      console.log(employeeResult.name);
      return employeeResult.name;
    } else {
      return "";
    }
  }

  function handleDisplayModalDelete(id) {
    setShowModal(true);
    setIdTour(id);
  }

  function close() {
    setShowModal(false);
  }

  async function handleSearchTour() {
    if (!search) {
      return toast.error("Bạn chưa nhập key search");
    }
    try {
      const res = await axios.get(
        `${BASE_URL}/tours/search/getTourByName?s=` + search
      );
      if (res.status == 200) {
        setListTour(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteCategory() {
    setShowModal(false);
    try {
      const res = await axios.delete(`${BASE_URL}/tours/${idTour}`);
      if (res.status === 200) {
        const newListTour = listTour.filter((tour) => tour._id !== idTour);
        setListTour(newListTour);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeTourPropertiesFeatured(tour_id) {
    console.log(tour_id);
  }

  return (
    <>
      <div className="container">
        <h1 className="text-center">Danh sách tour</h1>
        <ToastContainer />
        <div className="d-flex justify-content-between header__list">
          <div className="d-flex justify-content-end mb-4">
            <NavLink className="btn primary__btn" to="../create-tour">
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Tạo mới
              Tour
            </NavLink>
          </div>
          <div>
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i className="fa fa-bars"></i>
            </button>
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
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
                    onClick={handleSearchTour}
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
              <th scope="col">Hình ảnh</th>
              <th width="100" scope="col">
                Danh mục
              </th>
              <th scope="col">Lịch trình</th>
              <th scope="col">Đặc sắc</th>
              <th width="120" scope="col">
                Quản lý
              </th>
            </tr>
          </thead>
          <tbody>
            {listTour &&
              Array.isArray(listTour) &&
              listTour.reverse().map((tour) => {
                i++;
                return (
                  <tr key={tour._id}>
                    <th scope="row">{i}</th>
                    <td>{tour.title}</td>
                    <td>
                      <div className="cover-image">
                        <img
                          className="image-item"
                          src={`${BASE_PULIC}/${tour.photo}`}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{displayCategory(tour.category_id)}</td>
                    <td>
                      <p className="text">{tour.desc}</p>
                    </td>
                    <td>
                      {tour.featured && tour.featured == true ? (
                        <Badge
                          onClick={() =>
                            handleChangeTourPropertiesFeatured(tour._id)
                          }
                          className="badge__feature bg-danger"
                        >
                          Đặc sắc
                        </Badge>
                      ) : (
                        <p
                          onClick={() =>
                            handleChangeTourPropertiesFeatured(tour._id)
                          }
                          className="badge__feature bg__text"
                          style={{ background_color: "#f79c57 !important" }}
                        >
                          Bình thường
                        </p>
                      )}
                    </td>

                    <td>
                      <NavLink
                        to={`/admin/update-tour/${tour._id}`}
                        className="btn btn__warning text-white"
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </NavLink>
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
        {!Array.isArray(listTour) || listTour.length === 0 ? (
          <p className="text-center">Không tìm thấy</p>
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

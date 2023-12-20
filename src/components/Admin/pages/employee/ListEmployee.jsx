import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, BASE_PULIC } from "../../../../utils/config";
import { Modal } from "react-bootstrap";
import "./ListEmployee.css";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListEmplyee() {
  const [listEmployee, setListEmployee] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [listCategory, setListCategory] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getAllEmployee();
  }, [page]);

  const getAllEmployee = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/employee/getAll?page=` + page);
      setListEmployee(res.data.data);
      const resCategory = await axios.get(`${BASE_URL}/category`);
      const resAllEmployee = await axios.get(`${BASE_URL}/employee`);
      if (resAllEmployee.status == 200) {
        const EmployeeCount = resAllEmployee.data.count;
        const pages = Math.ceil(EmployeeCount / 8); // later we will use backend data count
        setPageCount(pages);
      }
      setListCategory(resCategory.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function close() {
    setShowModal(false);
  }

  function handleDispayModalDelete(id) {
    setShowModal(true);
    setIdEmployee(id);
  }

  const handleDeleteCategory = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(`${BASE_URL}/employee/${idEmployee}`);
      if (res.status === 200) {
        const newListCategory = listEmployee.filter(
          (employItem) => employItem._id !== idEmployee
        );
        setListEmployee(newListCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function displayCategory(category_id) {
    const catResult = listCategory.find((cat) => cat._id === category_id);
    if (catResult) {
      return catResult.name;
    } else {
      return "";
    }
  }

  async function handleSearchEmployee() {
    if (!search) {
      return toast.error("Bạn chưa nhập key search");
    }
    try {
      const res = await axios.get(
        `${BASE_URL}/employee/search/getEmployeeSearchByName?s=` + search
      );
      if (res.status == 200) {
        setListEmployee(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  let i = 0;

  return (
    <div className="container">
      <h1 className="text-center">Danh sách nhân viên</h1>
      <ToastContainer />
      <div className="d-flex justify-content-between header__list">
        <div className="d-flex justify-content-end mb-4">
          <NavLink className="btn primary__btn" to="../create-employee">
            <i className="fa fa-plus-circle" aria-hidden="true"></i> Tạo nhân
            viên mới
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
                  onClick={handleSearchEmployee}
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
            <th scope="col">Tên nhân viên</th>
            <th scope="col">Hình đại diện</th>
            <th scope="col">Email</th>
            <th scope="col">Điện thoại</th>
            <th scope="col">Địa chỉ</th>
            <th scope="col" width="350">
              Mô tả
            </th>
            <th width="120" scope="col">
              Quản lý
            </th>
          </tr>
        </thead>
        <tbody>
          {listEmployee &&
            Array.isArray(listEmployee) &&
            listEmployee.reverse().map((employItem) => {
              i++;
              return (
                <tr key={employItem._id}>
                  <th scope="row">{i}</th>
                  <td>{employItem.name}</td>
                  <td>
                    <div className="cover-image">
                      <img
                        src={`${BASE_PULIC}/${employItem.photo}`}
                        alt=""
                        className="item-image"
                      />
                    </div>
                  </td>
                  <td>{employItem.email}</td>
                  <td>{employItem.phone}</td>
                  <td>{employItem.address}</td>
                  <p className="text">{employItem.description}</p>
                  <td>
                    <NavLink
                      to={`/admin/update-employee/${employItem._id}`}
                      className="btn btn__warning text-white"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </NavLink>
                    <button
                      onClick={() => handleDispayModalDelete(employItem._id)}
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
      {!Array.isArray(listEmployee) || listEmployee.length === 0 ? (
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
            <button onClick={close} className="btn primary__btn">
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
  );
}

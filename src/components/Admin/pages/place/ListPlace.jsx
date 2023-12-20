import { NavLink } from "react-router-dom";
import "./ListPlace.css";
import { BASE_PULIC, BASE_URL } from "../../../../utils/config";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListPlace() {
  const [listPlace, setListPlace] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idPlace, setIdPlace] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    getAllPlace();
  }, [page]);

  const getAllPlace = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/place/getAll?page=${page}`);
      setListPlace(res.data.data);
      const resAllPlace = await axios.get(`${BASE_URL}/place`);
      if (resAllPlace.status == 200) {
        const placeCount = resAllPlace.data.count;
        const pages = Math.ceil(placeCount / 12); // later we will use backend data count
        setPageCount(pages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let i = 0;

  function handleDispayModalDelete(id) {
    setIdPlace(id);
    setShowModal(true);
  }

  function close() {
    setShowModal(false);
  }

  async function handleDeleteCategory() {
    setShowModal(false);
    try {
      const res = await axios.delete(`${BASE_URL}/place/${idPlace}`);
      if (res.status === 200) {
        const newListPlace = listPlace.filter((place) => place._id !== idPlace);
        setListPlace(newListPlace);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSearchPlace() {
    if (!search) {
      return toast.error("Bạn chưa nhập key search");
    }
    try {
      const res = await axios.get(
        `${BASE_URL}/place/search/getPlaceSearchByName?s=` + search
      );
      if (res.status == 200) {
        setListPlace(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Danh sách địa điểm</h1>
      <ToastContainer />
      <div className="d-flex justify-content-between header__list">
        <div className="d-flex justify-content-end mb-4">
          <NavLink className="btn primary__btn" to="../create-place">
            <i className="fa fa-plus-circle" aria-hidden="true"></i> Tạo địa
            điểm mới
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
                  onClick={handleSearchPlace}
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
            <th scope="col">Tên địa điểm</th>
            <th scope="col" width="350">
              Mô tả
            </th>
            <th scope="col">Hình ảnh</th>
            <th scope="col" width="350">
              Nội dung
            </th>
            <th width="120" scope="col">
              Quản lý
            </th>
          </tr>
        </thead>
        <tbody>
          {listPlace &&
            Array.isArray(listPlace) &&
            listPlace.reverse().map((place) => {
              i++;
              return (
                <tr key={place._id}>
                  <th scope="row">{i}</th>
                  <td>{place.name}</td>
                  <td>
                    <p className="text">{place.description}</p>
                  </td>
                  <td>
                    <div className="cover-image">
                      <img
                        src={`${BASE_PULIC}/${place.photo}`}
                        alt=""
                        className="item-image"
                      />
                    </div>
                  </td>
                  <td>
                    <p className="text">{place.introduction}</p>
                  </td>
                  <td>
                    <NavLink
                      to={`/admin/update-place/${place._id}`}
                      className="btn btn__warning  text-white"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </NavLink>
                    <button
                      onClick={() => handleDispayModalDelete(place._id)}
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
      {!Array.isArray(listPlace) || listPlace.length === 0 ? (
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

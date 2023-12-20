import { NavLink } from "react-router-dom";
import "./ListCategory.css";
import { AdminDataContext } from "../../../../context/AdminDataContext";
import { useEffect, useState } from "react";
import { BASE_PULIC } from "../../../../utils/config";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../../utils/config";
export default function ListCategory() {
  const [showModal, setShowModal] = useState(false);
  const [idCategory, setIdCategory] = useState("");
  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/category`);
      setListCategory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let i = 0;
  function close() {
    setShowModal(false);
  }

  function handleDispayModalDelete(id) {
    setShowModal(true);
    setIdCategory(id);
  }

  function handleChangeCategoryPropertiesStatus(category_id) {
    console.log(category_id);
  }

  const handleDeleteCategory = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(`${BASE_URL}/category/${idCategory}`);
      if (res.status === 200) {
        const newListCategory = listCategory.filter(
          (catItem) => catItem._id != idCategory
        );
        setListCategory(newListCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Danh sách danh mục</h1>
      <div className="d-flex justify-content header__list mb-4">
        <NavLink className="btn primary__btn" to="../create-category">
          <i className="fa fa-plus-circle" aria-hidden="true"></i> Tạo mới danh
          mục
        </NavLink>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên danh mục</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Quản lý</th>
          </tr>
        </thead>
        <tbody>
          {listCategory &&
            Array.isArray(listCategory) &&
            listCategory.reverse().map((category) => {
              i++;
              return (
                <tr key={category._id}>
                  <th scope="row">{i}</th>
                  <td>{category.name ? category.name : ""}</td>
                  <td>
                    <div className="cover-image">
                      <img
                        className="image-item"
                        src={`${BASE_PULIC}/${category.photo}`}
                        alt=""
                      />
                    </div>
                  </td>
                  <td>
                    {category.status && category.status == true ? (
                      <span
                        className="badge badge__feature bg__text"
                        onClick={() =>
                          handleChangeCategoryPropertiesStatus(category._id)
                        }
                      >
                        Hiển thị
                      </span>
                    ) : (
                      <span
                        className="badge badge__feature bg-danger"
                        onClick={() =>
                          handleChangeCategoryPropertiesStatus(category._id)
                        }
                      >
                        Không hiển thị
                      </span>
                    )}
                  </td>
                  <td>
                    <NavLink
                      to={`/admin/update-category/${category._id}`}
                      className="btn btn__warning  text-white"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </NavLink>
                    <button
                      onClick={() => handleDispayModalDelete(category._id)}
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
      {!Array.isArray(listCategory) || listCategory.length == 0 ? (
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

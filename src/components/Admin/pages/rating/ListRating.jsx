// import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../utils/config";
import { Modal } from "react-bootstrap";
import "./rating.css";
export default function ListEmplyee() {
  const [listEmployee, setListEmployee] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idEmployee, setIdEmployee] = useState("");
  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/employee`);
      setListEmployee(res.data.data);
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

  let i = 0;

  return (
    <div className="container">
      <h1 className="mb-4">Danh sách đánh giá</h1>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Người dùng</th>
            <th scope="col">Tour</th>
            <th scope="col">Số sao</th>
            <th scope="col">Nội dung</th>
            <th scope="col">Thao tác</th>
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

                  <td>{employItem.position}</td>
                  <td>{employItem.email}</td>
                  <td>{employItem.phone}</td>
                  <td>
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
  );
}

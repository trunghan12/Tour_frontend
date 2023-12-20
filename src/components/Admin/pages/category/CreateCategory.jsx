import { useState, useEffect } from "react";
import { BASE_URL } from "../../../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createCategory.css";

export default function CreateCategory() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [file, setFile] = useState({});
  const [status, setStatus] = useState(true);

  const [editCategory, setEditIdCategory] = useState({});
  const params = useParams();
  const getSingle = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/category/${id}`);
      const category_edit = await res.data.data;
      setEditIdCategory(category_edit);
      setName(category_edit.name);
      setStatus(category_edit.status);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateCategory = async () => {
    //handle update category
    if (!name || name === "") {
      return toast.error("Vui lòng nhập tên danh mục");
    } else {
      const data = {
        name: name,
        photo: file.name,
        status: status,
      };
      if (file.name) {
        try {
          const res = await axios.put(
            `${BASE_URL}/category/${editCategory._id}`,
            data,
            {
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          if (res.status === 200) {
            const resUpload = await axios.post(
              `${BASE_URL}/upload`,
              { file: file },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            if (resUpload.status === 200) {
              const newCategory = await res.data.data;
              navigate("/admin/list-category");
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const { photo, ...newData } = data;
        try {
          const res = await axios.put(
            `${BASE_URL}/category/${editCategory._id}`,
            newData,
            {
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          navigate("/admin/list-category");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      getSingle(params.id);
    } else {
      setEditIdCategory({});
    }
  }, []);

  function validationStoreCategory() {
    if (!name) {
      return toast.error("Vui lòng nhập tên danh mục");
    } else if (!file || !file.name) {
      return toast.error("Vui lòng chọn hình ảnh");
    }
    return true;
  }

  const handleStoreCategory = async () => {
    //handle store category
    const isSubmit = validationStoreCategory();
    if (isSubmit === true) {
      const data = {
        name: name,
        photo: file.name,
        status: status,
      };
      try {
        const res = await axios.post(`${BASE_URL}/category`, data, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (res.status === 200) {
          const resUpload = await axios.post(
            `${BASE_URL}/upload`,
            { file: file },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (resUpload.status === 200) {
            const newCategory = await res.data.data;
            navigate("/admin/list-category");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("Vui lòng chọn hình ảnh");
    }
    //validation type file upload
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return toast.error("Vui lòng chỉ chọn hình ảnh");
    }
    //validation size file upload
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return toast.error("Kích thước ảnh quá lớn");
    }
    e.target.files[0].originalname = e.target.files[0].name;
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className="container">
        {/* <h1>New Category</h1> */}
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h2 className="m-0 font-weight-bold">
                  {editCategory._id ? "Chỉnh sửa" : "Tạo"} Danh Mục
                </h2>
                <ToastContainer />
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Tên Danh Mục</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend input__group">
                    <span className="input-group-text input__group">
                      Tải lên
                    </span>
                  </div>
                  <div className="custom-file">
                    <input
                      onChange={handleChangeFile}
                      type="file"
                      className="custom-file-input"
                    />
                    <label className="custom-file-label">Chọn tập tin</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input check__input"
                      type="checkbox"
                      checked={status}
                      onClick={() => setStatus(!status)}
                      id="Hiển thị"
                    />
                    <label className="form-check-label" for="Hiển thị">
                      Hiển thị
                    </label>
                  </div>
                </div>
                <div className="text-center">
                  {editCategory._id ? (
                    <button
                      onClick={handleUpdateCategory}
                      className="btn btn-danger"
                    >
                      Cập nhật
                    </button>
                  ) : (
                    <button
                      onClick={handleStoreCategory}
                      className="btn primary__btn"
                    >
                      Gửi
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

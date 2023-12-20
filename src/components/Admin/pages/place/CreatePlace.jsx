import { useState, useEffect } from "react";
import axios, { all } from "axios";
import { BASE_URL } from "../../../../utils/config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePlace() {
  const navigate = useNavigate();
  const param = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [file, setFile] = useState({});
  const [editPlace, setEditIdPlace] = useState({});

  const getSingle = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/place/${id}`);
      const place_edit = await res.data.data;
      setEditIdPlace(place_edit);
      setName(place_edit.name);
      setDescription(place_edit.description);
      setIntroduction(place_edit.introduction);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (param.id) {
      getSingle(param.id);
    } else {
      setEditIdPlace({});
    }
  }, []);

  async function handleStorePlace() {
    const data = {
      name: name,
      photo: file.name,
      description: description,
      introduction: introduction,
    };

    try {
      if (editPlace._id) {
        //update place
        const isSubmit = validationUpdatePlace();
        if (isSubmit === true) {
          if (file.name) {
            const res = await axios.put(
              `${BASE_URL}/place/${editPlace._id}`,
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
                navigate("/admin/list-place");
              }
            }
          } else {
            const { photo, ...newData } = data;
            const res = await axios.put(
              `${BASE_URL}/place/${editPlace._id}`,
              newData,
              {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );
            navigate("/admin/list-place");
          }
        }
      } else {
        //create place
        const isSubmit = validationStorePlace();
        if (isSubmit === true) {
          const res = await axios.post(`${BASE_URL}/place`, data, {
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
              navigate("/admin/list-place");
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function validationStorePlace() {
    if (!name) {
      return toast.error("Vui lòng nhập tên địa điểm");
    } else if (!description) {
      return toast.error("Vui lòng nhập mô tả địa điểm");
    } else if (!introduction) {
      return toast.error("Vui lòng nhập nội dung địa điểm");
    } else if (!file || !file.name) {
      return toast.error("Vui lòng chọn hình ảnh");
    }
    return true;
  }

  function validationUpdatePlace() {
    if (!name) {
      return toast.error("Vui lòng nhập tên địa điểm");
    } else if (!description) {
      return toast.error("Vui lòng nhập mô tả địa điểm");
    } else if (!introduction) {
      return toast.error("Vui lòng nhập nội dung địa điểm");
    }
    return true;
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("Vui lòng chọn hình ảnh");
    }
    //validation type file
    const allowsTyped = ["image/jpeg", "image/png", "image/gif"];
    if (!allowsTyped.includes(file.type)) {
      return toast.error("Vui lòng chỉ chọn hình ảnh");
    }
    //validation size image
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
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h2 className="m-0 font-weight-bold"> Địa điểm</h2>
                <ToastContainer />
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Tên địa điểm</label>
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
                <label>Mô tả</label>
                <div className="input-group mb-3">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    aria-label="With textarea"
                  ></textarea>
                </div>
                <label>Nội dung</label>
                <div className="input-group mb-3">
                  <textarea
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    className="form-control"
                    aria-label="With textarea"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleStorePlace}
                    className="btn primary__btn"
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

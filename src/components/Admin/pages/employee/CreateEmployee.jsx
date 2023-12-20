import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../utils/config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const param = useParams();
  const [editEmployee, setEditIdEmployee] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({});

  const getSingle = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/employee/${id}`);
      const employee_edit = await res.data.data;
      setEditIdEmployee(employee_edit);
      setName(employee_edit.name);
      setEmail(employee_edit.email);
      setPhone(employee_edit.phone);
      setPosition(employee_edit.position);
      setAddress(employee_edit.address);
      setDescription(employee_edit.description);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (param.id) {
      getSingle(param.id);
    } else {
      setEditIdEmployee({});
    }
  }, []);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("Vui lòng chọn hình ảnh");
    }
    //validation type image
    const allowsTyped = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    if (!allowsTyped.includes(file.type)) {
      return toast.error("Vui lòng chỉ chọn hình ảnh");
    }
    //validate size image
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return toast.error("Kích thước ảnh quá lớn");
    }
    e.target.files[0].originalname = e.target.files[0].name;
    setFile(e.target.files[0]);
  };

  const handleStoreEmployee = async () => {
    const data = {
      name: name,
      photo: file.name,
      email: email,
      phone: phone,
      address: address,
      description: description,
    };

    if (editEmployee._id) {
      //update employe
      const isSubmit = validationUpdateEmployee();
      if (isSubmit === true) {
        if (file.name) {
          try {
            const res = await axios.put(
              `${BASE_URL}/employee/${editEmployee._id}`,
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
                navigate("/admin/list-employee");
              }
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          const { photo, ...newData } = data;
          try {
            const res = await axios.put(
              `${BASE_URL}/employee/${editEmployee._id}`,
              newData,
              {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
              }
            );
            navigate("/admin/list-employee");
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else {
      //store employee
      const isSubmit = validationStoreEmployee();
      if (isSubmit === true) {
        try {
          const res = await axios.post(`${BASE_URL}/employee`, data, {
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
              navigate("/admin/list-employee");
            }
          }
        } catch (error) {
          toast.error("Tên đã tồn tại");
        }
      }
    }
  };

  function validationUpdateEmployee() {
    // name
    if (!name) {
      return toast.error("Vui lòng nhập tên nhân viên");
    }
    // email
    if (!email) {
      return toast.error("Vui lòng nhập email nhân viên");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return toast.error("Email không hợp lệ");
      }
    }

    // phone
    if (!phone) {
      return toast.error("Vui lòng nhập số điện thoại");
    } else if (phone.length < 10 || phone.length > 11) {
      return toast.error("Số điện thoại không hợp lệ");
    } else {
      const phoneRegex = /^\d{9}$/;
      if (phoneRegex.test(phone)) {
        return toast.error("Số điện thoại không hợp lệ");
      }
    }

    // address
    if (!address) {
      return toast.error("Vui lòng nhập địa chỉ nhân viên");
    }

    return true;
  }

  function validationStoreEmployee() {
    // name
    if (!name) {
      return toast.error("Vui lòng nhập tên nhân viên");
    }
    // email
    if (!email) {
      return toast.error("Vui lòng nhập email nhân viên");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return toast.error("Email không hợp lệ");
      }
    }

    // phone
    if (!phone) {
      return toast.error("Vui lòng nhập số điện thoại");
    } else if (phone.length < 10 || phone.length > 11) {
      console.log("so luong");
      return toast.error("Số điện thoại không hợp lệ");
    } else {
      const phoneRegex = /^\d{9}$/;
      if (phoneRegex.test(phone)) {
        return toast.error("Số điện thoại không hợp lệ");
      }
    }

    // address
    if (!address) {
      return toast.error("Vui lòng nhập địa chỉ nhân viên");
    }

    // photo
    if (!file || !file.name) {
      return toast.error("Vui lòng chọn hình ảnh");
    }

    return true;
  }

  function handleValidationPhone(e) {
    if (!isNaN(e.target.value)) {
      setPhone(e.target.value);
    } else {
      return toast.error("Nhập sai định dạng");
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="offset-md-2 col-md-8">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h2 className="m-0 font-weight-bold">Tạo nhân viên</h2>
              <ToastContainer />
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Tên nhân viên</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Điện thoại</label>
                <input
                  value={phone}
                  onChange={(e) => handleValidationPhone(e)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Mô tả</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend input__group">
                  <span className="input-group-text input__group">
                    Cập nhật
                  </span>
                </div>
                <div className="custom-file ">
                  <input
                    onChange={handleUploadImage}
                    type="file"
                    className="custom-file-input"
                  />
                  <label className="custom-file-label">Chọn tập tin</label>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={handleStoreEmployee}
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
  );
}

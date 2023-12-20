import { useState, useEffect } from "react";
import { BASE_URL } from "../../../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./createtour.css";

export default function CreateTour() {
  const navigate = useNavigate();
  const param = useParams();
  const [editTour, setEditIdTour] = useState({});
  const [listPlace, setListPlace] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listEmployee, setListEmployee] = useState([]);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [employee, setEmployee] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState({});
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(true);

  async function getAllCategory() {
    try {
      const res = await axios.get(`${BASE_URL}/place`);
      setListPlace(res.data.data);
      setCategory(res.data.data[0]._id);
      setEmployee(res.data.data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllPlace() {
    try {
      const res = await axios.get(`${BASE_URL}/category/getAll/statusIsTrue`);
      console.log(res)
      setListCategory(res.data.data);
      setPlace(res.data.data[0]._id);
      setEmployee(res.data.data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllEmployee() {
    try {
      const res = await axios.get(`${BASE_URL}/employee`);
      setListEmployee(res.data.data);
      setCategory(res.data.data[0]._id);
      setEmployee(res.data.data[0]._id);
    } catch (error) {
      console.log(error);
    }
  }

  const getSingle = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/tours/${id}`);
      const tour_edit = await res.data.data;
      setEditIdTour(tour_edit);
      setName(tour_edit.title);
      setPlace(tour_edit.city_id);
      setCategory(tour_edit.category_id);
      setEmployee(tour_edit.employee_id);
      setPrice(tour_edit.price);
      setQuantity(tour_edit.quantity);
      setDescription(tour_edit.desc);
      setFeatured(tour_edit.featured);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployee();
    getAllCategory();
    getAllPlace();
    if (param.id) {
      getSingle(param.id);
    } else {
      setEditIdTour({});
    }
  }, []);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return toast.error("Vui lòng chọn hình ảnh");
    }
    // Kiểm tra loại tệp upload lên
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return toast.error("Vui lòng chỉ upload hình ảnh");
    }

    // Kiểm tra kích thước của tệp (vd: tối đa 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      return toast.error("Kích thước hình ảnh quá lớn");
    }
    e.target.files[0].originalname = e.target.files[0].name;
    setFile(e.target.files[0]);
  };

  function validationCreateTour() {
    if (!name) {
      return toast.error("Vui lòng nhập tên Tour");
    } else if (!description) {
      return toast.error("Vui lòng nhập mô tả Tour");
    } else if (!file || !file.name) {
      return toast.error("Vui chọn hình ảnh Tour");
    }
    return true;
  }

  function validationUpdateTour() {
    if (!name) {
      return toast.error("Vui lòng nhập tên Tour");
    } else if (!description) {
      return toast.error("Vui lòng nhập mô tả Tour");
    }
    return true;
  }

  function handleStoreTourfeature(featured) {
    console.log(featured);
  }

  async function handleStoreTour() {
    const data = {
      title: name,
      category_id: category,
      employee_id: employee,
      city_id: place,
      photo: file.name,
      desc: description,
      reviews: [],
      featured: featured,
    };

    if (editTour._id) {
      //update tour
      let isSubmit = false;
      isSubmit = validationUpdateTour();
      if (isSubmit === true) {
        if (file.name) {
          const res = await axios.put(
            `${BASE_URL}/tours/${editTour._id}`,
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
              navigate("/admin/list-tour");
            }
          }
        } else {
          const { photo, ...newData } = data;
          const res = await axios.put(
            `${BASE_URL}/tours/${editTour._id}`,
            newData,
            {
              headers: { "Content-Type": "application/json" },
              credentials: "include",
            }
          );
          navigate("/admin/list-tour");
        }
      }
    } else {
      //create new tour
      let isSubmit = false;
      isSubmit = validationCreateTour();
      if (isSubmit === true) {
        const res = await axios.post(`${BASE_URL}/tours`, data, {
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
            navigate("/admin/list-tour");
          }
        }
      }
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-md-2 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h2 className="m-0 font-weight-bold">Tour</h2>
                {/* <button onClick={handleClickDemoToast}>Click me</button> */}
                <ToastContainer />
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Tên tour</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Địa điểm</label>
                  <select
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option>Chọn địa điểm</option>;
                    {listPlace &&
                      listPlace.map((placeItem) => {
                        return (
                          <option
                            selected={
                              placeItem._id === category ||
                              placeItem._id === employee
                                ? "selected"
                                : ""
                            }
                            key={placeItem._id}
                            value={placeItem._id}
                          >
                            {placeItem.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Danh mục</label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option>Chọn danh mục</option>;
                    {listCategory &&
                      listCategory.map((categoryItem) => {
                        return (
                          <option
                            selected={
                              categoryItem._id === category ||
                              categoryItem._id === employee
                                ? "selected"
                                : ""
                            }
                            key={categoryItem._id}
                            value={categoryItem._id}
                          >
                            {categoryItem.name}
                          </option>
                        );
                      })}
                  </select>
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
                    <label className="custom-file-label">Choose file</label>
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
                <label>Cập nhật đặc sắc</label>
                <div className="input-group mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input check__input"
                      type="checkbox"
                      checked={featured}
                      onClick={() => setFeatured(!featured)}
                      id="binh thuong"
                    />
                    <label class="form-check-label" for="binh thuong">
                      Đặc sắc
                    </label>
                  </div>
                </div>

                <div className="text-center mb-3">
                  <button
                    onClick={handleStoreTour}
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

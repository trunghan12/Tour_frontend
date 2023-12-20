import { useState, useEffect } from "react";
import { BASE_URL } from "../../../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

import { ToastContainer, Zoom, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateUpcomming() {
  const param = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(getTodayISOString());
  const [listTour, setListTour] = useState([]);
  const [price, setPrice] = useState("");
  const [maxGroupSize, setMaxGroupSize] = useState("");
  const [priceChildren, setPriceChild] = useState("");
  const [maxGroupSizeChildren, setMaxGroupSizeChildren] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [idTour, setIdTour] = useState("");
  const [idEmployee, setIdEmployee] = useState("");
  const [lishEmployee, setListEmployee] = useState([]);
  const [name, setName] = useState("");
  const [featured, setFeatured] = useState(true);
  const [description, setDescription] = useState("");
  const [editTourComming, setEditIdTourComming] = useState({});

  useEffect(() => {
    getAllTourUnscheduled();
    if (param.id) {
      getSingle(param.id);
    } else {
      setEditIdTourComming({});
    }
  }, []);

  console.log(editTourComming)

  async function getSingle(id) {
    try {
      const res = await axios.get(`${BASE_URL}/tours/${id}`);
      const tour_edit = await res.data.data;
      console.log(tour_edit)
      setEditIdTourComming(tour_edit);
      setIdTour(tour_edit._id)
      setName(tour_edit.title);
      setIdEmployee(tour_edit.employee_id);
      setPrice(tour_edit.price);
      setPriceChild(tour_edit.price_children);
      setMaxGroupSize(tour_edit.maxGroupSize);
      setMaxGroupSizeChildren(tour_edit.maxGroupSize_chidlren);
      setStartDate(tour_edit.start_date);
      setEndDate(tour_edit.end_date);
      setFeatured(tour_edit.featured);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllTourUnscheduled() {
    try {
      const listTourResult = await axios.get(
        `${BASE_URL}/tours/unscheduled/getAllTourUnScheduled`
      );
      setListTour(listTourResult.data.data);

      const listEmployeeResult = await axios.get(`${BASE_URL}/employee`);
      setListEmployee(listEmployeeResult.data.data);
    } catch (error) {
      console.log(error);
    }
  }


  function getTodayISOString() {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  }

  // Event handler for date change
  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function validationUpdateTour() {

  }


  function validationCreateTour() {
    //tour
    if (!idTour) {
      return toast.error("Vui lòng chọn tour");
    }
    if (!idEmployee) {
      return toast.error("Vui lòng chọn hướng dẫn viên");
    }
    if (!maxGroupSize) {
      return toast.error("Vui lòng nhập số lượng vé người lớn");
    } else if (!/^\d+$/.test(maxGroupSize)) {
      return toast.error(
        "Nhập sai định dạng số lượng vé người lớn vui lòng nhập lại"
      );
    }
    if (!maxGroupSizeChildren) {
      return toast.error("Vui lòng nhập số lượng vé trẻ em");
    } else if (!/^\d+$/.test(maxGroupSizeChildren)) {
      return toast.error(
        "Nhập sai định dạng số lượng vé trẻ em vui lòng nhập lại"
      );
    }
    if (!price) {
      return toast.error("Vui lòng nhập giá vé người lớn");
    } else if (!/^\d+$/.test(price)) {
      return toast.error(
        "Nhập sai định dạng giá vé người lớn vui lòng nhập lại"
      );
    }
    if (!priceChildren) {
      return toast.error("Vui lòng nhập giá vé trẻ em");
    } else if (!/^\d+$/.test(priceChildren)) {
      return toast.error("Nhập sai định dạng giá vé trẻ em vui lòng nhập lại");
    }
    if (!startDate) {
      return toast.error("Vui lòng chọn thời gian bắt đầu tour");
    }
    if (!endDate) {
      return toast.error("Vui lòng chọn thời gian kết thúc tour");
    }
    if (new Date(startDate) > new Date(endDate)) {
      return toast.error(
        "Vui lòng nhập thời kết thúc lớn hơn thời gian bắt đầu"
      );
    }

    return true;
  }

  async function handleSubmitCreateComming() {
    const data = {
      price: price,
      maxGroupSize: maxGroupSize,
      price_children: priceChildren,
      maxGroupSize_chidlren: maxGroupSizeChildren,
      start_date: startDate,
      employee_id: idEmployee,
      end_date: endDate,
    };


    if (idTour) {
      try {
        const res = await axios.put(`${BASE_URL}/tours/` + idTour, data, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (res.status === 200) {
          navigate("/admin/list-tour-upcomming");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function handleStoreTour() {
    const data = {
      price: price,
      maxGroupSize: maxGroupSize,
      price_children: parseInt(priceChildren),
      maxGroupSize_chidlren: parseInt(maxGroupSizeChildren),
      start_date: startDate,
      employee_id: idEmployee,
      end_date: endDate,
      start_date_real: new Date(startDate),
      end_date_real: new Date(endDate),
    };

    if (editTourComming._id) {
      let isSubmit = false;
      isSubmit = validationCreateTour();
      if (isSubmit === true) {
        const res = await axios.put(`${BASE_URL}/tours/${idTour}`, data, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (res.status === 200) {
          navigate("/admin/list-tour-upcomming");
        }
      }




    } else {
      //create new tour

      let isSubmit = false;
      isSubmit = validationCreateTour();
      if (isSubmit === true) {
        const res = await axios.put(`${BASE_URL}/tours/${idTour}`, data, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (res.status === 200) {
          navigate("/admin/list-tour-upcomming");
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
                {editTourComming && editTourComming._id ?
                  <h2 className="m-0 font-weight-bold">Chỉnh sửa Tour</h2> :
                  <h2 className="m-0 font-weight-bold">Thiết lập Tour</h2>
                }

                <ToastContainer />
              </div>
              <div className="card-body">
                {editTourComming && editTourComming._id ?
                  <h3>{editTourComming.title}</h3> :
                  <select
                    onChange={(e) => setIdTour(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Các tour chưa có lịch trình</option>
                    {listTour.map((tour) => (
                      <option key={tour._id} value={tour._id}>
                        {tour.title}
                      </option>
                    ))}
                  </select>
                }


                <select
                  onChange={(e) => setIdEmployee(e.target.value)}
                  className="form-select  mt-3"
                  aria-label="Default select example"
                  value={idEmployee}
                >
                  <option>Hướng dẫn viên</option>
                  {lishEmployee.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Số lượng vé người lớn</label>
                      <input
                        onChange={(e) => setMaxGroupSize(e.target.value)}
                        value={maxGroupSize}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Số lượng vé trẻ em</label>
                      <input
                        value={maxGroupSizeChildren}
                        onChange={(e) =>
                          setMaxGroupSizeChildren(e.target.value)
                        }
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Giá vé người lớn</label>
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Giá vé trẻ em</label>
                      <input
                        value={priceChildren}
                        onChange={(e) => setPriceChild(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Ngày bắt đầu tour</label>
                      <Form.Control
                        onChange={(e) => setStartDate(e.target.value)}
                        value={startDate}
                        type="date"
                        min={getTodayISOString()}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Ngày kết thúc tour</label>
                      <Form.Control
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        type="date"
                        min={getTodayISOString()}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
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

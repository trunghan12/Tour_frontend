import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, BASE_PULIC } from "../../../../utils/config";
import { Modal, Form } from "react-bootstrap";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function HomeAdmin() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [listStatistical, setListStatistical] = useState([]);
  const [paramURL, setParamURL] = useState("one-month-ago");

  const [chartData, setChartData] = useState({
    labels: ["Jun", "Jul", "Aug"],
    datasets: [
      {
        id: 1,
        label: "Doanh thu",
        data: [5, 6, 7],
      },
      {
        id: 2,
        label: "Lợi nhuận",
        data: [3, 2, 1],
      },
    ],
  });

  useEffect(() => {
    getStatisticalThreeMonthAgo();
  }, [paramURL]);

  async function getStatisticalThreeMonthAgo() {
    console.log(paramURL);
    try {
      const res = await axios.get(
        `${BASE_URL}/statistical/getStatistical/${paramURL}`
      );
      if (res.status == 200) {
        const listStatistical = await res.data.data;
        const newchartData = {
          labels: listStatistical.map((statistical) => statistical.order_date),
          datasets: [
            {
              id: 1,
              label: "Doanh thu",
              data: listStatistical.map((statistical) => statistical.sales),
            },
            {
              id: 2,
              label: "Lợi nhuận",
              data: listStatistical.map((statistical) => statistical.profit),
            },
          ],
        };
        setChartData(newchartData);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function getTodayISOString() {
    const currentDate = new Date();
    return currentDate.toISOString().split("T")[0];
  }

  function handleStartEndDate() {
    setParamURL(`start-end-date?start_date=${startDate}&end_date=${endDate}`);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex p-5 justify-content-between">
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>Thống kê</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setParamURL("one-week-ago")}>
                7 Ngày trước
              </DropdownItem>
              <DropdownItem onClick={() => setParamURL("one-month-ago")}>
                1 Tháng trước
              </DropdownItem>
              <DropdownItem onClick={() => setParamURL("three-month-ago")}>
                3 Tháng trước
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <div className="d-flex">
            <Form.Control
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              type="date"
              className="search__btn"
            />
            <Form.Control
              className="ml-1 search__btn"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              type="date"
            />
            <button onClick={handleStartEndDate} className="btn primary__btn">
              Lọc
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <Line data={chartData} />
      </div>
    </div>
  );
}

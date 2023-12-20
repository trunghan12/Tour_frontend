import { NavLink } from "react-router-dom";
import "./sidebar.css";
export default function SideBar() {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion sidebar__admin"
      id="accordionSidebar"
    >
      <a className="sidebar-brand d-flex align-items-center justify-content-center text-color">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink"></i>
        </div>
        <div className="sidebar-brand-text mx-3">
          SB Admin <sup>2</sup>
        </div>
      </a>
      <hr className="sidebar-divider my-0 br-color" />
      <li className="nav-item active text-color">
        <NavLink to="home-admin" className="nav-link text-color">
          <i className="fa fa-home text-color" aria-hidden="true"></i>
          <span>Trang chủ</span>
        </NavLink>
      </li>
      <hr className="sidebar-divider br-color" />
      <div className="sidebar-heading">{/* Interface */}</div>
      <li className="nav-item active text-color">
        <NavLink to="list-book-tour" className="nav-link text-color">
          <i className="fa fa-address-card text-color" aria-hidden="true"></i>
          <span>Quản lý đặt tour</span>
        </NavLink>
      </li>
      <li className="nav-item active text-color">
        <NavLink to="list-tour" className="nav-link text-color">
          <i
            className="fa fa-hourglass-start text-color"
            aria-hidden="true"
          ></i>
          <span>Tour</span>
        </NavLink>
      </li>
      <li className="nav-item active text-color">
        <NavLink to="list-tour-upcomming" className="nav-link text-color">
          <i className="fa fa-plane text-color" aria-hidden="true"></i>
          <span>Tour sắp diễn ra</span>
        </NavLink>
      </li>
      <li className="nav-item active text-color">
        <NavLink to="list-category" className="nav-link text-color">
          <i className="fa fa-align-justify text-color" aria-hidden="true"></i>
          <span>Danh Mục</span>
        </NavLink>
      </li>
      <li className="nav-item active text-color">
        <NavLink to="list-place" className="nav-link text-color">
          <i className="fa fa-globe text-color" aria-hidden="true"></i>
          <span>Địa Điểm</span>
        </NavLink>
      </li>
      <li className="nav-item active text-color">
        <NavLink to="list-employee" className="nav-link text-color">
          <i className="fa fa-user text-color" aria-hidden="true"></i>
          <span>Nhân Viên</span>
        </NavLink>
      </li>

      <li className="nav-item active text-color">
        <NavLink to="list-comment-tour" className="nav-link text-color">
          <i className="fa fa-commenting text-color" aria-hidden="true"></i>
          <span>Bình Luận Tour</span>
        </NavLink>
      </li>
      <li className="nav-item active text-color">
        <NavLink to="list-comment-guide" className="nav-link text-color">
          <i className="fa fa-commenting text-color" aria-hidden="true"></i>
          <span>Bình Luận hướng dẫn viên</span>
        </NavLink>
      </li>
      <hr className="sidebar-divider br-color" />
    </ul>
  );
}

import React, { useContext, useEffect } from "react";
import FooterAdmin from "../Footer/FooterAdmin";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import TopNav from "../TopNav/TopNav";
import LoginAdmin from "../Login/Login";
import { NavLink, useNavigate } from "react-router-dom";


// import
export default function AdminLayout() {
  const navigate = useNavigate();
  return (
    <>

        <div id="wrapper">
          <SideBar></SideBar>
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopNav></TopNav>
              <Outlet></Outlet>
            </div>
            <FooterAdmin></FooterAdmin>
          </div>
        </div>

    </>
  );
}

import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Layout from "../components/Layout/Layout";
import ToursPlace from "../pages/ToursPlace";
import TourGuide from "../pages/TourGuide";
import TourGuideDetails from "../shared/TourGuideDetails";
import ToursPlaceDetails from "../shared/ToursPlaceDetails";
import HistoryBooking from "../pages/HistoryBooking";
import Paypal from "../pages/Paypal.jsx";

// admin
import AdminLayout from "../components/Admin/Layout/LayoutAdmin";
import HomeAdmin from "../components/Admin/pages/home/HomeAdmin";
import CreateCategory from "../components/Admin/pages/category/CreateCategory";
import ListCategory from "../components/Admin/pages/category/ListCategory";
import ListComment from "../components/Admin/pages/comment/ListComment";
import ListCommentGuide from "../components/Admin/pages/commentGuide/ListCommentGuide";
import CreateEmployee from "../components/Admin/pages/employee/CreateEmployee";
import ListEmployee from "../components/Admin/pages/employee/ListEmployee";
import CreatePlace from "../components/Admin/pages/place/CreatePlace";
import ListPlace from "../components/Admin/pages/place/ListPlace";
import CreateTour from "../components/Admin/pages/tour/CreateTour";
import ListTour from "../components/Admin/pages/tour/ListTour";
import ListRating from "../components/Admin/pages/rating/ListRating";
import ListBookTour from "../components/Admin/pages/listbooktour/ListBookTour";
import ListStatistics from "../components/Admin/pages/liststatistics/ListStatistics";
import ListUpcomming from "../components/Admin/pages/upcomming/ListUpcomming";
import CreateUpcomming from "../components/Admin/pages/upcomming/CreateUpcomming";
import LoginAdmin from "../components/Admin/Login/Login.jsx";

// import { AdminDataContext } from '../context/AdminDataContext.js'

import { useRecoilState } from "recoil";
import { adminState } from "../context/recoil/AuthAdminRecoil";

const Routers = () => {
  const [admin, setAdmin] = useRecoilState(adminState);

  // const { resultAdmin } = useContext(AdminDataContext);
  // console.log(resultAdmin)
  // useEffect(() => {
  //   console.log(resultAdmin)
  //   if (localStorage.getItem("admin") !== null) {
  //     console.log(localStorage.getItem("admin"))
  //   } else {
  //     console.log('ko ton tai')
  //   }
  // },[resultAdmin])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tours/:id" element={<TourDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="checkout/:id" element={<Checkout />} />
        <Route path="paypal" element={<Paypal />} />
        <Route path="tours/search" element={<SearchResultList />} />
        <Route path="toursPlace" element={<ToursPlace />} />
        <Route path="toursPlace/:id" element={<ToursPlaceDetails />} />
        <Route path="tourGuide" element={<TourGuide />} />
        <Route path="tourGuide/:id" element={<TourGuideDetails />} />
        <Route path="history" element={<HistoryBooking />} />
      </Route>

      <Route
        path="/admin"
        element={admin !== null ? <AdminLayout /> : <LoginAdmin />}
      >
        <Route path="home-admin" element={<HomeAdmin />} />
        <Route path="list-tour" element={<ListTour />} />
        <Route path="create-tour" element={<CreateTour />} />
        <Route path="update-tour/:id" element={<CreateTour />} />
        <Route path="list-category" element={<ListCategory />} />
        <Route path="create-category" element={<CreateCategory />} />
        <Route path="update-category/:id" element={<CreateCategory />} />
        <Route path="list-place" element={<ListPlace />} />
        <Route path="create-place" element={<CreatePlace />} />
        <Route path="update-place/:id" element={<CreatePlace />} />
        <Route path="list-employee" element={<ListEmployee />} />
        <Route path="create-employee" element={<CreateEmployee />} />
        <Route path="update-employee/:id" element={<CreateEmployee />} />
        <Route path="list-comment-tour" element={<ListComment />} />
        <Route path="list-comment-guide" element={<ListCommentGuide />} />
        <Route path="list-rating" element={<ListRating />} />
        <Route path="list-book-tour" element={<ListBookTour />} />
        <Route path="list-statistics" element={<ListStatistics />} />
        <Route path="list-tour-upcomming" element={<ListUpcomming />} />
        <Route path="create-upcomming-tour" element={<CreateUpcomming />} />
        <Route path="update-upcoming/:id" element={<CreateUpcomming />} />
      </Route>

      <Route
        path="login-admin"
        element={admin !== null ? <AdminLayout /> : <LoginAdmin />}
      />
    </Routes>
  );
};

export default Routers;

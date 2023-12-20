import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import "./login.css";
import axios from "axios";

import {useRecoilState} from 'recoil'
import {adminState} from '../../../context/recoil/AuthAdminRecoil'

// useRecoilState hook returns [state, setState]

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useRecoilState(adminState);

   
  async function handleLogin() {
    const isSubmit = vaidationLoginAdmin();
    if (isSubmit === true) {
      const data = {
        email: email,
        password: password,
      };
      try {
        const res = await axios.post(`${BASE_URL}/authadmin/login`, data, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        console.log(res)
        toast.success("Đăng nhập thành công");
        localStorage.setItem("admin", JSON.stringify(res.data));
        setAdmin(res.data)
       
      } catch (err) {
        toast.error("Tài khoản không chính xác");
      }
    }
  }

  function vaidationLoginAdmin() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      if (!email) {
        return toast.error("Vui lòng nhập email");
      } else {
        return toast.error("Email nhập sai định dạng");
      }
    }

    if (!password) {
      return toast.error("Vui lòng nhập mật khẩu");
    } else if (password.length < 6 || password.length > 8) {
      return toast.error("Mật khẩu phải có độ dài từ 6 đến 9 kí tự");
    }
    return true;
  }

  return (
    <>
      <div className="container">
        <div className="form-tt">
          <h2>Đăng nhập</h2>
          <ToastContainer />
          <input
            className="mb-3"
            type="text"
            name="email"
            placeholder="Nhập email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className=""
            type="password"
            name="password"
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button
            onClick={handleLogin}
            className="btn btn-login mt-3 text-center font-weight-bold"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </>
  );
}

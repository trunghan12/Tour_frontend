import React, { useState, useContext } from "react";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";

import { ToastContainer, Zoom, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  function validationLoginUser() {
    if (!credentials.email) {
      return toast.error('Vui lòng nhập Email')
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        return toast.error('Email không hợp lệ')
      }
    }

    if (!credentials.password) {
      return toast.error('Vui lòng nhập password')
    } else {
      if (credentials.password.length < 5 || credentials.password.length > 8) {
        return toast.error('Độ dài mật khẩu không hợp lệ')
      }
    }

    return true;
  }

  const handleClick = async (e) => {
    const isSubmit = validationLoginUser()
    e.preventDefault();

    if (isSubmit === true) {
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(credentials),
        });

        const result = await res.json();
        if (!res.ok){
          // alert(result.message);
          toast.error(result.message)
        }else{
          dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
          navigate("/");
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.message });
      }
    }
  };

  return (
    <section>
      <Container>
        <ToastContainer />
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2> Đăng Nhập </h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Mật Khẩu"
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Đăng Nhập
                  </Button>
                </Form>
                <p>
                  Bạn chưa có tài khoản?
                  <Link to="/register">Tạo tài khoản </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;

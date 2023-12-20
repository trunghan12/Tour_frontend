import React, { useState, useContext } from "react";

import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utils/config";

import { ToastContainer, Zoom, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  function validationRegisterUser(){
    // validation username
    if(!credentials.username){
      return toast.error('Vui lòng nhập Username')
    }

    //validation email
    if(!credentials.email){
      return toast.error('Vui lòng nhập Email')
    }else{
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        return toast.error('Email không hợp lệ')
      }
    }

    //validation password
    if(!credentials.password){
      return toast.error('Vui lòng nhập password')
    }else{
      if(credentials.password.length < 6 || credentials.password.length > 8){
        return toast.error('Độ dài mật khẩu không hợp lệ')
      }
    }
    return true
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const isSubmit = validationRegisterUser()

    if(isSubmit === true){
      try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const result = await res.json();
  
        if (!res.ok){
          toast.error(result.message);
        }else{
          dispatch({ type: "REGISTER_SUCCESS" });
          navigate("/login");
        }
  
      } catch (err) {
        toast.error(err.message)
      }
    }
    
  };

  return (
    <section>
      <Container>
        <ToastContainer/>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Đăng Ký</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Tên tài khoản"
                      id="username"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Tạo tài khoản
                  </Button>
                </Form>
                <p>
                  Bạn đã có một tai khoản?
                  <Link to="/login">Dăng Nhập</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;

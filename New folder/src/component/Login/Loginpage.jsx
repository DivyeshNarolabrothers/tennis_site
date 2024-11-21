import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/login.css";
import Swal from "sweetalert2";

const Loginpage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // Initialize useNavigate

  const showAutoCloseAlert = (message) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const showAutoError = (message) => {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 3000,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(
        "http://localhost:9999/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.token) {
        // Save the token to localStorage with the key 'user_token'
        localStorage.setItem("user_token", response.data.token);
        showAutoCloseAlert("Login Successfully", response.data)
        // If login is successful, navigate to the home page
        
        navigate("/Home");
        window.location.reload();
      } else {
        // Handle error responses
        showAutoError("Login failed", response.data);
      }
    } catch (error) {
      showAutoError("Invalid email/password – please try again or register");
    }
  };

  const handleRegister = () => {
    // Navigate to the registration page
    navigate("/resigter");
  };
  const handleForgotPassword = () => {
    // Navigate to the registration page
    navigate("/forgotpassword");
  };




  return (
    <>
      <div
        className="modal fade show"
        id="formModal"
        tabIndex="-1"
        aria-labelledby="contained-modal-title-vcenter"
        role="dialog"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-bottom"
          role="document"
        >
          <div
            className="modal-content"
            style={{ backgroundColor: "black", marginBottom: "0" }}
          >
            <div className="modal-header">
              <h5
                className="modal-title"
                id="formModalLabel"
                style={{ color: "white" }}
              >
                Login
              </h5>
            </div>
            <div className="modal-body1" style={{ padding: "30px" }}>
              <form onSubmit={handleSubmit}>
                <div className="input-container">
                  <input
                    type="email"
                    required
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state on input change
                  />
                  <label>Email Address</label>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    required
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update state on input change
                  />
                  <label>Password</label>
                </div>
                <button type="submit" className="btn">
                  Continue
                </button>
              </form>

              {/* <div
                className="register-link"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                <div>
                  <button
                    // onClick={handleForgotPassword}
                    style={{
                      background: "none",
                      color: "lightblue",
                      border: "none",
                      cursor: "pointer",
                      marginBottom: '10px'
                    }}
                  >
                    Forgot Your Password?
                  </button>
                </div>
                <span style={{ color: "white" }}>Not Registered? </span>
                <button
                  onClick={handleRegister}
                  style={{
                    background: "none",
                    color: "lightblue",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Create an account
                </button>
              </div> */}
              <div
                className="register-link"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                  padding: "10px"
                }}
              >
                <div>
                  <button
                    onClick={handleForgotPassword}
                    style={{
                      background: "none",
                      color: "lightblue",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Your Password?
                  </button>
                </div>

                <div>
                  {/* <span style={{ color: "white" }}>Don't have an account? </span> */}
                  <button
                    onClick={handleRegister}
                    style={{
                      background: "none",
                      color: "lightblue",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Create an account?
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              required
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
            />
            <label>Email Address</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              required
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn">
            Continue
          </button>
          {/* <div
            className="register-link"
            style={{ marginTop: "10px", textAlign: "center" }}
          >
            <span style={{ color: "white" }}>Don't have an account? </span>
            <button
              onClick={handleRegister}
              style={{
                background: "none",
                color: "lightblue",
                border: "none",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </div> */}
           <div
                className="register-link"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                  padding: "10px"
                }}
              >
                <div>
                  <button
                    onClick={handleForgotPassword}
                    style={{
                      background: "none",
                      color: "lightblue",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Forgot Your Password?
                  </button>
                </div>

                <div>
                  {/* <span style={{ color: "white" }}>Don't have an account? </span> */}
                  <button
                    onClick={handleRegister}
                    style={{
                      background: "none",
                      color: "lightblue",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Create an account?
                  </button>
                </div>
              </div>
        </form>
      </div>


    </>
  );
};

export default Loginpage;


// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Login/login.css";
// import Swal from "sweetalert2";

// const ForgotPassword = () => {
//   const [newpassword, setnewpassword] = useState(""); // State for email
//   const [confirmpassword, setPassword] = useState(""); // State for password
//   const navigate = useNavigate(); // Initialize useNavigate

//   const showAutoCloseAlert = (message) => {
//     Swal.fire({
//       position: "top-end",
//       icon: "success",
//       title: message,
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   };

//   const showAutoError = (message) => {
//     Swal.fire({
//       position: "top-end",
//       icon: "error",
//       title: message,
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//       const response = await axios.post(
//         "http://localhost:9999/user/login",
//         {
//           newpassword,
//           confirmpassword,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200 && response.data.token) {
//         // Save the token to localStorage with the key 'user_token'
//         localStorage.setItem("user_token", response.data.token);
//         showAutoCloseAlert("Create New Password Successfully", response.data)
//         // If login is successful, navigate to the home page
//         navigate("/");
//       } else {
//         // Handle error responses
//         showAutoError("New Password Create failed", response.data);
//       }
//     } catch (error) {
//       showAutoError("Invalid password – please try again ");
//     }
//   };




//   return (
//     <>
//       <div
//         className="modal fade show"
//         id="formModal"
//         tabIndex="-1"
//         aria-labelledby="contained-modal-title-vcenter"
//         role="dialog"
//         aria-hidden="true"
//         style={{ display: "block" }}
//       >
//         <div
//           className="modal-dialog modal-dialog-centered modal-bottom"
//           role="document"
//         >
//           <div
//             className="modal-content"
//             style={{ backgroundColor: "black", marginBottom: "0" }}
//           >
//             <div className="modal-header">
//               <h5
//                 className="modal-title"
//                 id="formModalLabel"
//                 style={{ color: "white" }}
//               >
//                 Forgot Password
//               </h5>
//             </div>
//             <div className="modal-body1" style={{ padding: "30px" }}>
//               <form onSubmit={handleSubmit}>
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     required
//                     placeholder="Enter New Password"
//                     value={newpassword}
//                     onChange={(e) => setnewpassword(e.target.value)} // Update state on input change
//                   />
//                   <label>New Password</label>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     required
//                     placeholder="Enter Confirm Password"
//                     value={confirmpassword}
//                     onChange={(e) => setPassword(e.target.value)} // Update state on input change
//                   />
//                   <label>Confirm Password</label>
//                 </div>
//                 <button type="submit" className="btn">
//                   Continue
//                 </button>
//               </form>

//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="box">
//       <form onSubmit={handleSubmit}>
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     required
//                     placeholder="Enter New Password"
//                     value={newpassword}
//                     onChange={(e) => setnewpassword(e.target.value)} // Update state on input change
//                   />
//                   <label>New Password</label>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     required
//                     placeholder="Enter Confirm Password"
//                     value={confirmpassword}
//                     onChange={(e) => setPassword(e.target.value)} // Update state on input change
//                   />
//                   <label>Confirm Password</label>
//                 </div>
//                 <button type="submit" className="btn">
//                   Continue
//                 </button>
//               </form>
//       </div>


//     </>
//   );
// };

// export default ForgotPassword;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../forgot-password/forgotpassword.css";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // State for email
  const [newpassword, setNewPassword] = useState(""); // State for new password
  const [confirmpassword, setConfirmPassword] = useState(""); // State for confirm password
  const [otp, setOtp] = useState(""); // State for OTP input
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to check if OTP is sent
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

    if (isOtpSent) {
      // If OTP is already sent, submit OTP along with other details
      try {
        const response = await axios.patch(
          "http://localhost:9999/user/forgotPassword",
          {
            email,
            newPassword: newpassword,
            confirmPassword: confirmpassword,
            OTP: otp,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          showAutoCloseAlert("Password successfully updated.");
          navigate("/"); // Navigate to homepage after successful password reset
        } else {
          showAutoError("Failed to update password.");
        }
      } catch (error) {
        showAutoError("Invalid OTP or password reset failed.");
      }
    } else {
      // If OTP is not sent yet, trigger OTP sending
      try {
        const response = await axios.post(
          "http://localhost:9999/user/otp",
          { email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setIsOtpSent(true); // Mark OTP as sent
          showAutoCloseAlert("OTP sent to your email. Please check.");
        } else {
          showAutoError("Failed to send OTP.");
        }
      } catch (error) {
        showAutoError("Failed to send OTP.");
      }
    }
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
        <div className="modal-dialog modal-dialog-centered modal-bottom" role="document">
          <div className="modal-content" style={{ backgroundColor: "black", marginBottom: "0" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="formModalLabel" style={{ color: "white" }}>
                Forgot Password
              </h5>
            </div>
            <div className="modal-body1" style={{ padding: "30px" }}>
              <form onSubmit={handleSubmit}>
                {!isOtpSent ? (
                  // Form to enter email, new password, and confirm password
                  <>
                    <div className="input-container">
                      <input
                        type="email"
                        required
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label>Email</label>
                    </div>
                    <div className="input-container">
                      <input
                        type="password"
                        required
                        placeholder="Enter New Password"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <label>New Password</label>
                    </div>
                    <div className="input-container">
                      <input
                        type="password"
                        required
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label>Confirm Password</label>
                    </div>
                    <button type="submit" className="btn">
                      Continue
                    </button>
                  </>
                ) : (
                  // Form to enter OTP after sending OTP
                  <>
                    <div className="input-container">
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <label>OTP</label>
                    </div>
                    <button type="submit" className="btn">
                      Submit OTP
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

             <div className="box1">
          <form onSubmit={handleSubmit}>
                {!isOtpSent ? (
                  // Form to enter email, new password, and confirm password
                  <>
                    <div className="input-container">
                      <input
                        type="email"
                        required
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label>Email</label>
                    </div>
                    <div className="input-container">
                      <input
                        type="password"
                        required
                        placeholder="Enter New Password"
                        value={newpassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <label>New Password</label>
                    </div>
                    <div className="input-container">
                      <input
                        type="password"
                        required
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <label>Confirm Password</label>
                    </div>
                    <button type="submit" className="btn1">
                      Continue
                    </button>
                  </>
                ) : (
                  // Form to enter OTP after sending OTP
                  <>
                    <div className="input-container">
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <label>OTP</label>
                    </div>
                    <button type="submit" className="btn">
                      Submit OTP
                    </button>
                  </>
                )}
              </form>
       </div>


    </>
  );
};

export default ForgotPassword;

// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import '../Resigter/resigterPage.css';

// function ResigterPage() {
//   const [fullName, setFullName] = useState(""); // State for full name
//   const [email, setEmail] = useState(""); // State for email
//   const [password, setPassword] = useState(""); // State for password
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//       const response = await fetch("http://35.200.147.33/api/user/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         // If registration is successful, navigate to the home page
//         navigate("/");
//       } else {
//         // Handle error responses
//         const errorData = await response.json();
//         console.error("Error:", errorData);
//       }
//     } catch (error) {
//       console.error("Error:", error);
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
//         <div className="modal-dialog modal-dialog-centered modal-bottom" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="formModalLabel" style={{ color: "white" }}>
//                 Register
//               </h5>
//             </div>
//             <div className="modal-body1" style={{ padding: '30px' }}>
//               <form onSubmit={handleSubmit}>
//                 <div className="input-container">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Enter Full Name"
//                     value={name}
//                     onChange={(e) => setFullName(e.target.value)} // Update state on input change
//                   />
//                   <label>Full Name</label>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="email" // Changed from "mail" to "email"
//                     required
//                     placeholder="Enter Email Address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} // Update state on input change
//                   />
//                   <label>Email Address</label>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     required
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} // Update state on input change
//                   />
//                   <label>Password</label>
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
//         {/* This second form can be removed if not needed */}
//         <form onSubmit={handleSubmit}>
//           <div className="input-container">
//             <input
//               type="text"
//               required
//               placeholder="Enter Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)} // Update state on input change
//             />
//             <label>Full Name</label>
//           </div>
//           <div className="input-container">
//             <input
//               type="email"
//               required
//               placeholder="Enter Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} // Update state on input change
//             />
//             <label>Email Address</label>
//           </div>
//           <div className="input-container">
//             <input
//               type="password"
//               required
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Update state on input change
//             />
//             <label>Password</label>
//           </div>
//           <button type="submit" className="btn">
//             Continue
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default ResigterPage;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import '../Resigter/resigterPage.css';
// import axios from "axios";

// function ResigterPage() {
//   const [fullName, setFullName] = useState(""); // State for full name
//   const [email, setEmail] = useState(""); // State for email
//   const [password, setPassword] = useState(""); // State for password
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission
//     try {
//       const response = await axios.post("http://35.200.147.33/api/user/register", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: fullName, // Send fullName as name
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         // If registration is successful, navigate to the home page
//         navigate("/");
//       } else {
//         // Handle error responses
//         const errorData = await response.json();
//         console.error("Error:", errorData);
//       }
//     } catch (error) {
//       console.error("Error:", error);
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
//         <div className="modal-dialog modal-dialog-centered modal-bottom" role="document">
//           <div className="modal-content " style={{backgroundColor:'black'}}>
//             <div className="modal-header">
//               <h5 className="modal-title" id="formModalLabel" style={{ color: "white" }}>
//                 Register
//               </h5>
//             </div>
//             <div className="modal-body1" style={{ padding: '30px' }}>
//               <form onSubmit={handleSubmit}>
//                 <div className="input-container">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Enter Full Name"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)} // Update state on input change
//                   />
//                   <label>Full Name</label>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="email" // Changed from "mail" to "email"
//                     required
//                     placeholder="Enter Email Address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)} // Update state on input change
//                   />
//                   <label>Email Address</label>
//                 </div>
//                 <div className="input-container">
//                   <input
//                     type="password"
//                     required
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)} // Update state on input change
//                   />
//                   <label>Password</label>
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
//         {/* This second form can be removed if not needed */}
//         <form onSubmit={handleSubmit}>
//           <div className="input-container">
//             <input
//               type="text"
//               required
//               placeholder="Enter Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)} // Update state on input change
//             />
//             <label>Full Name</label>
//           </div>
//           <div className="input-container">
//             <input
//               type="email"
//               required
//               placeholder="Enter Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} // Update state on input change
//             />
//             <label>Email Address</label>
//           </div>
//           <div className="input-container">
//             <input
//               type="password"
//               required
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} // Update state on input change
//             />
//             <label>Password</label>
//           </div>
//           <button type="submit" className="btn">
//             Continue
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default ResigterPage;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import '../Resigter/resigterPage.css';
import axios from "axios";
import Swal from "sweetalert2";

function RegisterPage() {
  const [fullName, setFullName] = useState(""); // State for full name
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
      const response = await axios.post("http://35.200.147.33/api/user/register", {
        name: fullName, // Send fullName as name
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json", // Set content type
        },
      });

      if (response.status === 201 || response.data.status) {
        const { _id, name, email, profile_image, credits } = response.data.userData; // Extract user data from response

        // Store user data in localStorage
        localStorage.setItem("fullName", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profile_image", profile_image); // Optionally save profile image
        localStorage.setItem("credits", credits); // Optionally save credits
        localStorage.setItem("userId", _id); // Store user ID
        showAutoCloseAlert("Resigter Successfully",response.data)
        // Redirect to login page after successful registration
        navigate("/"); // Update the path if you have a specific login page route
      } else {
        // Handle error responses
        showAutoError("This email is already registered. Please login", response.data.message);
      }
    } catch (error) {
      showAutoError("This email is already registered. Please login", error.response?.data?.message || error.message);
    }
  };

  const handleLogin = ()=>{
    navigate('/')
  }

  return (
    <>
    <div className="modal fade show" id="formModal" tabIndex="-1" aria-labelledby="contained-modal-title-vcenter" role="dialog" aria-hidden="true" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered modal-bottom" role="document">
        <div className="modal-content" style={{ backgroundColor: 'black' }}>
          <div className="modal-header">
            <h5 className="modal-title" id="formModalLabel" style={{ color: "white" }}>Register</h5>
          </div>
          <div className="modal-body1" style={{ padding: '30px' }}>
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  required
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} // Update state on input change
                />
                <label>Full Name</label>
              </div>
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
              <button type="submit" className="btn">Continue</button>
            </form>
              <div
                className="register-link"
                style={{ marginTop: "10px", textAlign: "center" }}
              >
                <span style={{ color: "white" }}>Don't have an account? </span>
                <button
                  onClick={handleLogin}
                  style={{
                    background: "none",
                    color: "lightblue",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Login
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
      <div className="box">
         {/* This second form can be removed if not needed */}
         <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="text"
                  required
                  placeholder="Enter Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} // Update state on input change
                />
                <label>Full Name</label>
              </div>
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
              <button type="submit" className="btn2">Continue</button>
            </form>
       </div>
       </>   
  );
}

export default RegisterPage;

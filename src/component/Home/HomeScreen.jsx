import React, { useEffect, useState } from "react";
import "../Home/homeScreen.css";
import image1 from '../../images/tennis-racket.svg'
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// function HomeScreen() {
//   const navigate = useNavigate();
//   const fullName = localStorage.getItem("fullName") || "User"; // Default to "User" if not found
//   const credits = localStorage.getItem("credits") || 0; // Default to 0 if not found

//   // If needed, you can ensure the state is initialized on first render using useEffect
//   useEffect(() => {
//     console.log("Component Mounted");
//   }, []); // Empty array to run only on the first render

//   return (
//     <div className="container">
//       <div className="card" style={{ background: "none" }}>
//         <div className="card-header">
//           <div className="d-flex">
//             <div className="left-section">{fullName}</div>
//             <div className="right-section">
//               <h3 className="h3">Credit</h3>
//               <p>
//                 Available: <span>{credits}</span>
//               </p>
//               <p>
//                 In-Play Value: <span>0</span>
//               </p>
//               <p style={{ paddingTop: '5px' }}>
//                 Overall +/- :<span>0</span>
//               </p>
//             </div>
//           </div>
//           <div className="d-flex">
//             <div className="left-section">Home</div>
//             <div className="right-market">
//               <button className="button" onClick={() => navigate("/market")}>
//                 View Market
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="card-body">
//           <h3 className="h3">What Would You Like to Do?</h3>

//           <div className="body-div">
//             <div className="d-flex">
//               <div className="icon" onClick={() => navigate("/profile")}>
//                 <i className="fa-regular fa-user"></i>
//                 <h2>My Profile</h2>
//               </div>
//               <div className="icon" onClick={() => navigate("/myteam")}>
//                 <i className="fa-solid fa-people-group"></i>
//                 <h2>My Team</h2>
//               </div>
//             </div>
//             <div className="d-flex">
//               <div className="icon" onClick={() => navigate("/market")}>
//                 <img src={image1} className="market-img" alt="Market" />
//                 <h2>The Market</h2>
//               </div>
//               <div className="icon" onClick={() => navigate("/faq")}>
//                 <i className="fa-solid fa-book-open"></i>
//                 <h2>User Guide</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="card-footer">
//           <div className="footer">
//             <div className="footer-first">
//               <button className="btn1">Start Building Your Team</button>
//             </div>
//             <div className="d-flex">
//               <div className="first">
//                 <h4>0/8</h4>
//                 <p className="p1">Selections</p>
//                 <p className="p1">0.00 spent</p>
//               </div>
//               <div className="second">
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// function HomeScreen() {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState({ fullName: "User", credits: 0 });

//   useEffect(() => {
//     // Get the user token from local storage
//     const token = localStorage.getItem("user_token");

//     if (token) {
//       try {
//         // Decode the token to get the user ID
//         const decodedToken = jwtDecode(token);
//         console.log("Decoded Token:", decodedToken); // Debugging line
//         const userId = decodedToken._id; // Assuming _id is directly in the decoded token

//         if (userId) {
//           console.log("User ID:", userId); // Debugging line
//           // Fetch user list from the API
//           axios.get("http://35.200.147.33/api/users/userList", {
//             headers: { user_token: token }
//           })
//           .then(response => {
//             console.log("API Response:", response.data); // Debugging line

//             // Access userDetails from the response
//             const userDetails = response.data.userDetails; // Accessing userDetails

//             // Check if userDetails is an array
//             if (Array.isArray(userDetails)) {
//               // Check if the user ID matches
//               const matchedUser = userDetails.find(user => user._id.toString() === userId.toString());
//               console.log("Matched User:", matchedUser); // Debugging line

//               if (matchedUser) {
//                 // If there's a match, extract name and credits
//                 const { name, credits } = matchedUser;
//                 setUserData({ fullName: name, credits });
//               } else {
//                 console.error("No user found with the matching ID.");
//               }
//             } else {
//               console.error("userDetails is not an array:", userDetails);
//             }
//           })
//           .catch(error => {
//             console.error("Error fetching user data", error);
//           });
//         } else {
//           console.error("User ID is not found in decoded token");
//         }
//       } catch (error) {
//         console.error("Failed to decode token", error);
//       }
//     } else {
//       console.error("Token not found in localStorage");
//     }

//     console.log("Component Mounted");
//   }, []); // Empty array to run only on the first render

  
//   return (
//     <div className="container">
//       <div className="card" style={{ background: "none" }}>
//         <div className="card-header">
//           <div className="d-flex">
//             <div className="left-section">{userData.fullName}</div>
//             <div className="right-section">
//               <h3 className="h3">Credit</h3>
//               <p>
//                 Available: <span>{userData.credits}</span>
//               </p>
//               <p>
//                 In-Play Value: <span>0</span>
//               </p>
//               <p style={{ paddingTop: "5px" }}>
//                 Overall +/- :<span>0</span>
//               </p>
//             </div>
//           </div>
//           <div className="d-flex">
//             <div className="left-section">Home</div>
//             <div className="right-market">
//               <button className="button" onClick={() => navigate("/market")}>
//                 View Market
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="card-body">
//           <h3 className="h3">What Would You Like to Do?</h3>

//           <div className="body-div">
//             <div className="d-flex">
//               <div className="icon" onClick={() => navigate("/profile")}>
//                 <i className="fa-regular fa-user"></i>
//                 <h2>My Profile</h2>
//               </div>
//               <div className="icon" onClick={() => navigate("/myteam")}>
//                 <i className="fa-solid fa-people-group"></i>
//                 <h2>My Team</h2>
//               </div>
//             </div>
//             <div className="d-flex">
//               <div className="icon" onClick={() => navigate("/market")}>
//                 <img src={image1} className="market-img" alt="Market" />
//                 <h2>The Market</h2>
//               </div>
//               <div className="icon" onClick={() => navigate("/faq")}>
//                 <i className="fa-solid fa-book-open"></i>
//                 <h2>User Guide</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="card-footer">
//           <div className="footer">
//             <div className="footer-first">
//               <button className="btn1">Start Building Your Team</button>
//             </div>
//             <div className="d-flex">
//               <div className="first">
//                 <h4>0/8</h4>
//                 <p className="p1">Selections</p>
//                 <p className="p1">0.00 spent</p>
//               </div>
//               <div className="second">
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//                 <div className="circle1"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



function HomeScreen() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ fullName: "User", credits: 0 });

  // useEffect(() => {
  //   // Get the user token from local storage
  //   const token = localStorage.getItem("user_token");

  //   if (token) {
  //     try {
  //       // Decode the token to get the user ID
  //       const decodedToken = jwtDecode(token);
  //       console.log("Decoded Token:", decodedToken); // Debugging line
  //       const userId = decodedToken._id; // Assuming _id is directly in the decoded token

  //       if (userId) {
  //         console.log("User ID:", userId); // Debugging line
  //         // Fetch user list from the API
  //         axios.get("http://35.200.147.33/api/users/userList", {
  //           headers: { user_token: token }
  //         })
  //         .then(response => {
  //           console.log("API Response:", response.data); // Debugging line

  //           // Access userDetails from the response
  //           const userDetails = response.data.userDetails; // Accessing userDetails

  //           // Check if userDetails is an array
  //           if (Array.isArray(userDetails)) {
  //             // Check if the user ID matches
  //             const matchedUser = userDetails.find(user => user._id.toString() === userId.toString());
  //             console.log("Matched User:", matchedUser); // Debugging line

  //             if (matchedUser) {
  //               // If there's a match, extract name and credits
  //               const { name, credits } = matchedUser;
  //               setUserData({ fullName: name, credits });
  //             } else {
  //               console.error("No user found with the matching ID.");
  //             }
  //           } else {
  //             console.error("userDetails is not an array:", userDetails);
  //           }
  //         })
  //         .catch(error => {
  //           console.error("Error fetching user data", error);
  //         });
  //       } else {
  //         console.error("User ID is not found in decoded token");
  //       }
  //     } catch (error) {
  //       console.error("Failed to decode token", error);
  //     }
  //   } else {
  //     console.error("Token not found in localStorage");
  //   }

  //   console.log("Component Mounted");
  // }, []); // Empty array to run only on the first render

  useEffect(() => {
    // Get the user token from local storage
    const token = localStorage.getItem("user_token");

    if (token) {
      try {
        // Decode the token to get the user ID
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Debugging line
        const userId = decodedToken._id; // Assuming _id is directly in the decoded token

        if (userId) {
          console.log("User ID:", userId); // Debugging line
          // Fetch user list from the API
          axios.get("http://35.200.147.33/api/users/userList", {
            headers: { Authorization: `Bearer ${token}` } // Pass token in Bearer format
          })
          .then(response => {
            console.log("API Response:", response.data); // Debugging line

            // Access userDetails from the response
            const userDetails = response.data.userDetails; // Adjust this based on your actual response structure

            // Check if userDetails is an array
            if (Array.isArray(userDetails)) {
              // Check if the user ID matches
              const matchedUser = userDetails.find(user => user._id.toString() === userId.toString());
              console.log("Matched User:", matchedUser); // Debugging line

              if (matchedUser) {
                // If there's a match, extract name and credits
                const { name, credits } = matchedUser;
                setUserData({ fullName: name, credits });
              } else {
                console.error("No user found with the matching ID.");
              }
            } else {
              console.error("userDetails is not an array:", userDetails);
            }
          })
          .catch(error => {
            console.error("Error fetching user data", error);
          });
        } else {
          console.error("User ID is not found in decoded token");
        }
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    } else {
      console.error("Token not found in localStorage");
    }

    console.log("Component Mounted");
  }, []); // Empty array to run only on the first render

  return (
    <div className="container">
      <div className="card" style={{ background: "none" }}>
        <div className="card-header">
          <div className="d-flex">
            <div className="left-section">{userData.fullName}</div>
            <div className="right-section">
              <h3 className="h3">Credit</h3>
              <p>
                Available: <span>{userData.credits}</span>
              </p>
              <p>
                In-Play Value: <span>0</span>
              </p>
              <p style={{ paddingTop: "5px" }}>
                Overall +/- :<span>0</span>
              </p>
            </div>
          </div>
          <div className="d-flex">
            <div className="left-section">Home</div>
            <div className="right-market">
              {/* Ensure this button uses the navigate function correctly */}
              <button 
                className="button" 
                onClick={() => navigate("/market")}
                type="button" // Prevents default form submission if this is in a form
              >
                View Market
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h3 className="h3">What Would You Like to Do?</h3>

          <div className="body-div">
            <div className="d-flex">
              <div className="icon">
                <i className="fa-regular fa-user"  onClick={() => navigate("/profile")}></i>
                <h2  onClick={() => navigate("/profile")}>My Profile</h2>
              </div>
              <div className="icon" >
                <i className="fa-solid fa-people-group" onClick={() => navigate("/myteam")}></i>
                <h2 onClick={() => navigate("/myteam")}>My Team</h2>
              </div>
            </div>
            <div className="d-flex">
              <div className="icon" >
                <img src={image1} className="market-img" alt="Market" onClick={() => navigate("/market")}/>
                <h2 onClick={() => navigate("/market")}>The Market</h2>
              </div>
              <div className="icon" >
                <i className="fa-solid fa-book-open" onClick={() => navigate("/faq")}></i>
                <h2 onClick={() => navigate("/faq")}>User Guide</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="footer">
            <div className="footer-first">
              <button className="btn1">Start Building Your Team</button>
            </div>
            <div className="d-flex">
              <div className="first">
                <h4>0/8</h4>
                <p className="p1">Selections</p>
                <p className="p1">0.00 spent</p>
              </div>
              <div className="second">
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
                <div className="circle1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




export default HomeScreen;



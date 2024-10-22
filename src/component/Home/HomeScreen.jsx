import React, { useEffect } from "react";
import "../Home/homeScreen.css";
import image1 from '../../images/tennis-racket.svg'
import { useNavigate } from "react-router-dom";

// function HomeScreen() {
//   const navigate = useNavigate(); 
//   const fullName = localStorage.getItem("fullName") || "User"; // Default to "User" if not found
//   const credits = localStorage.getItem("credits") || 0; // Default to 0 if not found
//   return (
//     <div className="container">
//       <div className="card" style={{ background: "none" }}>
//         <div className="card-header">
//           <div className=" d-flex">
//             <div className="left-section">{fullName}</div>
//             <div className="right-section">
//               <h3 className="h3">Creadit</h3>
//               <p>
//                 Available:<span>{credits}</span>
//               </p>
//               <p>
//                 In-Play Value:<span>0</span>
//               </p>
//               <p style={{paddingTop:'5px'}}>
//                 Overrall +/- :<span>0</span>
//               </p>
//             </div>
//           </div>
//           <div className="d-flex">
//             <div className="left-section">Home</div>
//             <div className="right-market">
//               <button className="button" onClick={() => navigate("/market")}>View Market</button>
//             </div>
//           </div>
//         </div>
//         <div className="card-body ">
//           <h3 className="h3">What Would You Like to Do ?</h3>

//           <div className="body-div">
//             <div className="d-flex">
//               <div className="icon" onClick={() => navigate("/profile")}>
//                 <i class="fa-regular fa-user"></i>
//                 <h2>My Profile</h2>
//               </div>
//               <div className="icon" onClick={() => navigate("/myteam")}>
//                 <i class="fa-solid fa-people-group"></i>
//                 <h2>My Team</h2>
//               </div>
//             </div>
//             <div className="d-flex">
//               <div className="icon" onClick={() => navigate("/market")}>
//                 <img src={image1} className="market-img"/>
//                 <h2>The Market</h2>
//               </div>
//               <div className="icon" onClick={() => navigate("/faq")}>
//                 <i class="fa-solid fa-book-open"></i>
//                 <h2>User Guide</h2>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="card-footer">
//           <div className="footer">
//             <div className="footer-first">
//               <button className="btn1">Start Buliding Your Team</button>
//             </div>
//             <div className="d-flex">
//               <div className="first">
//                 <h4>0/8</h4>
//                 <p className="p1">selections</p>
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
  const fullName = localStorage.getItem("fullName") || "User"; // Default to "User" if not found
  const credits = localStorage.getItem("credits") || 0; // Default to 0 if not found

  // If needed, you can ensure the state is initialized on first render using useEffect
  useEffect(() => {
    console.log("Component Mounted");
  }, []); // Empty array to run only on the first render

  return (
    <div className="container">
      <div className="card" style={{ background: "none" }}>
        <div className="card-header">
          <div className="d-flex">
            <div className="left-section">{fullName}</div>
            <div className="right-section">
              <h3 className="h3">Credit</h3>
              <p>
                Available: <span>{credits}</span>
              </p>
              <p>
                In-Play Value: <span>0</span>
              </p>
              <p style={{ paddingTop: '5px' }}>
                Overall +/- :<span>0</span>
              </p>
            </div>
          </div>
          <div className="d-flex">
            <div className="left-section">Home</div>
            <div className="right-market">
              <button className="button" onClick={() => navigate("/market")}>
                View Market
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h3 className="h3">What Would You Like to Do?</h3>

          <div className="body-div">
            <div className="d-flex">
              <div className="icon" onClick={() => navigate("/profile")}>
                <i className="fa-regular fa-user"></i>
                <h2>My Profile</h2>
              </div>
              <div className="icon" onClick={() => navigate("/myteam")}>
                <i className="fa-solid fa-people-group"></i>
                <h2>My Team</h2>
              </div>
            </div>
            <div className="d-flex">
              <div className="icon" onClick={() => navigate("/market")}>
                <img src={image1} className="market-img" alt="Market" />
                <h2>The Market</h2>
              </div>
              <div className="icon" onClick={() => navigate("/faq")}>
                <i className="fa-solid fa-book-open"></i>
                <h2>User Guide</h2>
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



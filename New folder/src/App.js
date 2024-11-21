import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './images/bg.jpg';
import image2 from './images/50460101 - Copy.jpg';
import ResigterPage from './component/Resigter/ResigterPage';
import HomeScreen from './component/Home/HomeScreen';
import Buliding from './component/Buliding/Buliding';
import Market from './component/Market/market';
import FaqPage from './component/Faq/FaqPage';
import ProfilePage from './component/Profile/profilePage';
import Loginpage from './component/Login/Loginpage';
import ForgotPassword from './component/forgot-password/ForgotPassword';

function App() {
  return (

    <div>
      {/* Background Images */}
      <img src={image1} className="bg" alt="Background" />
      <img src={image2} className="bg2" alt="Background" />

     
        <Routes>
          <Route path="/resigter" element={<ResigterPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/" element={<Loginpage />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/myteam" element={<Buliding />} />
          <Route path="/market" element={<Market />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
     
    </div>

  );
}

export default App;

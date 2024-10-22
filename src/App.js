import {Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from './images/50460101.jpg';
import image2 from './images/50460101 - Copy.jpg';
import ResigterPage from './component/Resigter/ResigterPage';
import HomeScreen from './component/Home/HomeScreen';
import Buliding from './component/Buliding/Buliding';
import Market from './component/Market/market';
import FaqPage from './component/Faq/FaqPage';
import ProfilePage from './component/Profile/profilePage';
import Loginpage from './component/Login/Loginpage';

function App() {
  return (
  
      <div>
        <img src={image1} className='bg' alt="Background" />
        <img src={image2} className='bg2' alt="Background" />
        
        {/* Set up routes for different components */}
        <Routes>
          <Route path="/resigter" element={<ResigterPage />} />
          <Route path="/" element={<Loginpage />} />
          <Route path="/Home" element={<HomeScreen />} />
          <Route path="/myteam" element={<Buliding />} />
          <Route path="/market" element={<Market />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    
  );
}

export default App;

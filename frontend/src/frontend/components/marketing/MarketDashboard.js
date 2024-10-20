import { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
// import Home from './Home';
import './dashboard.css';
import { UserContext } from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MarketDashboard() {
  const { auth, user} = useContext(UserContext);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [rtype, setRtype] = useState('');
  const navigate= useNavigate();
 
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('tokenExpiration'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  useEffect(() => {
    
    const checkAuth = () => {
      if (userRole !== 'user' || !jwtToken || Date.now() > tokenExpiration) {
        navigate('/login');
      }
    };
    checkAuth();
    const intervalId = setInterval(checkAuth, 20000);
    return () => clearInterval(intervalId);
  }, [userRole, jwtToken, tokenExpiration, navigate]);



  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className={`combinelay ${openSidebarToggle ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className='grid-container'>
        <Sidebar 
          openSidebarToggle={openSidebarToggle} 
          setActiveItem={setActiveItem} 
          activeItem={activeItem} 
        />
        <div className='main-content'>
          <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
          {activeItem === 'Dashboard' && <></>}
          {activeItem === 'Submit Inquiry' && <></>}
          {activeItem === 'Courses' && <></>}
          {activeItem === 'Fees Structure' && <></>}
          {activeItem === 'Profile' && <></>}
          {activeItem !== 'Dashboard' && <></>}
        </div>
      </div>
    </div>
  );
}

export default MarketDashboard;

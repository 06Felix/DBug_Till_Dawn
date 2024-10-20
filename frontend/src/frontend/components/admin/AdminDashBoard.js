import { useState, useContext, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
// import Home from './Home';
import '../marketing/dashboard.css';
import { UserContext } from '../../../UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddUsers from './AddUsers';
import UsersTable from './UsersTable';
import AnalystTable from './AnalystTable';
import MarketingTable from './MarketingTable';

function AdminDashboard() {
  const { auth, user} = useContext(UserContext);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);
  const [activeItem, setActiveItem] = useState('Add Users');
  const [rtype, setRtype] = useState('');
  const navigate= useNavigate();
 
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken'));
  const [tokenExpiration, setTokenExpiration] = useState(localStorage.getItem('tokenExpiration'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  useEffect(() => {
    const checkAuth = () => {
      if (userRole !== 'admin' || !jwtToken || Date.now() > tokenExpiration) {
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
          {activeItem === 'Add Users' && <AddUsers/>}
          {activeItem === 'Users' && <UsersTable/>}
          {activeItem === 'Socail Media Analysers' && <AnalystTable/>}
          {activeItem === 'Marketing Managers' && <MarketingTable/>}
          {activeItem !== 'Dashboard' && <></>}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

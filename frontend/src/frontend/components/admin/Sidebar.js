import React, { useContext, useEffect } from 'react';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext';

function Sidebar({ openSidebarToggle, setActiveItem, activeItem }) {
  const navigate = useNavigate();
  const { setAuth, setUser } = useContext(UserContext);

  const handleLogout = () => {
    setAuth(false);
    setUser(null);
    localStorage.removeItem('user');
    navigate("/");
    alert("Logged out Successfully");
  };

  useEffect(() => {
    if (openSidebarToggle) {
      setActiveItem('Add Users');
    }
  }, [openSidebarToggle, setActiveItem]);

  const menuItems = [
    { name: 'Add Users', icon: 'bx bxs-user-plus' },
    { name: 'Users', icon: 'bx bxs-user' },
    { name: 'Socail Media Analysers', icon: 'bx bxs-analyse' },
    { name: 'Marketing Managers', icon: 'bx bxs-briefcase-alt-2' },
    { name: 'Log out', icon: 'bx bx-log-out', action: handleLogout }
  ];

  const handleItemClick = (item) => {
    if (item.name !== 'Log out') {
        setActiveItem(item.name);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='proname'>
          <div className='sidebar-brand'>
            <span>DEBUG TILL DAWN</span>
          </div>
        </div>
      </div>

      <ul className='sidebar-list'>
        {menuItems.map(item => (
          <li
            key={item.name}
            className={`sidebar-list-item ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => handleItemClick(item)}
          >
            <a href="#" onClick={e => e.preventDefault()}>
              <i className={item.icon}></i>
              <span className="links_name">{item.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;

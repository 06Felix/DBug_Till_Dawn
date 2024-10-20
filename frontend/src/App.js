import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './frontend/components/Login/LoginSignup';
import MarketDashboard from './frontend/components/marketing/MarketDashboard';
import { UserProvider } from './UserContext';
import AnalystDashboard from './frontend/components/analyst/AnalystDashboard';
import UserDashboard from './frontend/components/enduser/UserDashboard';
import AdminDashboard from './frontend/components/admin/AdminDashBoard';
import HomePage from './frontend/components/home/HomePage';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginSignup/>} />
            <Route path="marketingDash" element={<MarketDashboard/>}/>
            <Route path="analystDash" element={<AnalystDashboard/>}/>
            <Route path="UserDash" element={<UserDashboard/>}/>
            <Route path="admindashboard" element={<AdminDashboard/>}/>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

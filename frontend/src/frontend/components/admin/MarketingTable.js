import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import './ReportTable.css';

const MarketingTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/marketing-roles');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UserReports');
    XLSX.writeFile(workbook, 'user_report_data.xlsx');
  };

  return (
    <div className="unique-report-container">
      <h3 className="unique-report-title mb-3">Marketing Manager Reports</h3>
      <div className="unique-export-button mb-3">
        <button onClick={handleExport} className="unique-btn-info">Export to Excel</button>
      </div>
      <table className="unique-report-table table-bordered table-hover">
        <thead className="unique-table-header">
            <th>S.No</th>
            <th>Email</th>
            <th>Last Logged In</th>
        </thead>
        <tbody>
          {loading ? ( // If loading, display loading message
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>Loading...</td>
            </tr>
          ) : userData.length === 0 ? ( // If no data, show 'No marketing managers found' message
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>No marketing managers found</td>
            </tr>
          ) : (
            userData.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.lastLoggedInTime}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarketingTable;

import React, { useState, useEffect } from 'react';
import './attendance.css'; // Ensure you have the appropriate styles

const LoginHistoryReport = () => {
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    // Fetch all employee login history
    fetch('http://localhost:8080/login/show')
      .then(response => response.json())
      .then(data => setLoginHistory(data))
      .catch(error => console.error('Error fetching login history:', error));
  }, []);

  return (
    <div className="attendance-report">
      <h1 className="heading">Login History Report</h1>
      <table>
        <thead>
          <tr>
            <th className="heading">ID</th>
            <th className="heading">Login Time</th>
          </tr>
        </thead>
        <tbody>
          {loginHistory.map((login, index) => (
            <tr key={index}>
              <td>{login.id}</td>
              <td>{new Date(login.loginTime).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoginHistoryReport;

import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    // Validation checks
    if (!employeeId) {
      alert('Please enter your Employee ID');
      return;
    }
    if (!password) {
      alert('Please enter your Password');
      return;
    }
 
    try {
      const response = await axios.get(`http://localhost:8080/apis/employee/check/${employeeId}/${password}`);
      const { success, designation } = response.data;
 
      if (success) {
        alert('Login successful!');
        if (designation !== "Hr") {
          navigate("/employee");
        } else {
          navigate("/HRpage");
        }
      } else {
        alert('Wrong credentials!');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    }
  };
 
  return (
    <div className="login-container">
      <h2>Employee Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Employee ID</label>
          <input
            type="text"
            className='login-input'
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            className='login-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input className="login-button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};
 
export default Login;
 
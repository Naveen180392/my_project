import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "./EmployeeDetails.css"


const EmployeeDetails = () => {
  const [employee, setEmployee] = useState({
    id: '',
    experience: '',
    qualification: '',
    salary: '',
    designation: '',
  });

  const [seconds, setSeconds] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [documents, setDocuments] = useState({
    highestQualification: null,
    sscCertificate: null,
    relievingLetter: null,
  });

  useEffect(() => {
    // Fetch employee details from the provided API
    axios.get('http://localhost:8080/api/employees/91471890')
      .then(response => {
        const { id, experience, qualification, salary, designation } = response.data;
        setEmployee({
          id,
          experience,
          qualification,
          salary,
          designation,
        });
      })
      .catch(error => {
        console.error('Error fetching employee details:', error);
      });

    // Simulate fetching login history status
    axios.get('/api/login_history')
      .then(response => {
        setLoggedIn(response.data.loggedIn);
      });

    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e:any) => {
    const { name, files } = e.target;
    setDocuments(prevDocuments => ({
      ...prevDocuments,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle form submission
  };

  const formatTime = (seconds:any) => {
    return moment.utc(seconds * 1000).format('HH:mm:ss');
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Employee Details</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID:</label>
          <input type="text" value={employee.id} readOnly className="text-input" />
        </div>
       
        <div className="form-group">
          <label>Experience:</label>
          <input type="text" value={employee.experience} readOnly className="text-input" />
        </div>
        <div className="form-group">
          <label>Qualification:</label>
          <input type="text" value={employee.qualification} readOnly className="text-input" />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input type="text" value={employee.salary} readOnly className="text-input" />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input type="text" value={employee.designation} readOnly className="text-input" />
        </div>
        <div className="form-group">
          <label>Highest Qualification document:</label>
          <input type="file" name="highestQualification" onChange={handleFileChange} className="file-input" />
        </div>
        <div className="form-group">
          <label>SSC Certificate:</label>
          <input type="file" name="sscCertificate" onChange={handleFileChange} className="file-input" />
        </div>
        <div className="form-group">
          <label>Releaving Letter:</label>
          <input type="file" name="relievingLetter" onChange={handleFileChange} className="file-input" />
        </div>
        <div className="centered-text">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
      <div className="centered-text">
        <button onClick={() => alert('Logged out')} className="logout-button">Logout</button>
        <div className="logged-in-status">
          <button className={`status-button ${loggedIn ? 'green' : 'red'}`}>
            {loggedIn ? 'IN' : 'OUT'}
          </button>
          <div className="timer">Timer: {formatTime(seconds)}</div>
        </div>
      </div>
    </div>
  );
  
};

export default EmployeeDetails;

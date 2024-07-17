import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeOnboarding.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  empId: number;
  experience: number;
  qualification: string;
  salary: number;
  designation: string;
  qualificationDoc: any; // Update as per your backend response type
  sscCertificate: any; // Update as per your backend response type
  releavingLetter: any; // Update as per your backend response type
}

const EmployeeOnboarding = () => {
  const [formData, setFormData] = useState({
    experience: 0,
    qualification: '',
    salary: 0,
    designation: '',
    qualificationDoc: null,
    sscCertificate: null,
    releavingLetter: null,
  });

  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get<Employee[]>('http://localhost:8080/apis/employee/all');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post('http://localhost:8080/apis/employee/save', formData, { headers });
      console.log(response);
      // Handle success or navigate to another page
    } catch (error) {
      console.error('Error onboarding employee:', error);
      // Handle error
    }
  };

  const handleAttendancePage = () => {
    navigate("/attendance");
  };

  return (
    <div className="container">
      <h2>Employee Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Experience:</label>
          <input type="number" name="experience" value={formData.experience} onChange={handleChange} />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" name="salary" value={formData.salary} onChange={handleChange} />
        </div>
        <div>
          <label>Designation:</label>
          <select name="designation" value={formData.designation} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Hr">HR</option>
          </select>
        </div>
        <div>
          <label>Qualification:</label>
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} />
        </div>
        <div>
          <label>Qualification Document:</label>
          <input type="file" name="qualificationDoc" onChange={handleChange} />
        </div>
        <div>
          <label>SSC Certificate:</label>
          <input type="file" name="sscCertificate" onChange={handleChange} />
        </div>
        <div>
          <label>Relieving Letter:</label>
          <input type="file" name="releavingLetter" onChange={handleChange} />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>

      <div>
        <button className='attendance_button' onClick={handleAttendancePage}>
          Attendance Report
        </button>
      </div>

      <div>
        <h3>Employees List:</h3>
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Experience</th>
              <th>Qualification</th>
              <th>Salary</th>
              <th>Designation</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.empId}</td>
                <td>{employee.experience}</td>
                <td>{employee.qualification}</td>
                <td>{employee.salary}</td>
                <td>{employee.designation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default EmployeeOnboarding;

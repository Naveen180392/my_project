import EmployeeOnboarding from './employeeonboarding';
import './App.css';
import Login from './login'
import EmployeeDetails from './EmployeeDetails';
import AttendanceReport from './attendance'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
function App() {
  return (
    // <div>
        // <EmployeeOnboarding/>
      // <Login/>
    //   {/* <EmployeeDetails/> */}
    // </div>
    <Router>
      <Routes>
        <Route path = "/" element={<Login/>}/>
        <Route path = "/employee"  element = {<EmployeeDetails/>}/>
        <Route path = "/HRpage"  element = {<EmployeeOnboarding/>}/>
        <Route path = "/attendance"  element = {<AttendanceReport/>}/>
      </Routes>
    </Router>
  )
}
export default App;
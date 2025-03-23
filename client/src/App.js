import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegisterPatient from "./pages/RegisterPatient.js";
import Dashboard from "./pages/AdminDashboard";
import DoctorDashboard from './pages/DoctorDashboard';
import Login from "./pages/Login.js";
import PatientDashboard from "./pages/PatientDashboard.js";
import PatientAppointments from "./pages/PatientAppointment.js";
import SearchDoctorsPage from "./pages/SearchDoctorsPage.js";
import BillsPage from "./pages/BillsPage.js";
import Register from "./pages/Register";
import ApproveDoctors from "./pages/ApproveDoctors";
import ManageDoctors from "./pages/ManageDoctors";
import ScheduleShift from "./pages/ScheduleShift";
import Register from './pages/Register';
import Shifts from './pages/Shifts';
import Appointment from './pages/Appointment';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path = "/patient/dashboard" element = {<PatientDashboard/>}/>
            <Route path = "/patient/register" element = {<RegisterPatient/>}/>
            <Route path = "/patient/login/" element = {<Login/>}/>
            <Route path = "/patient/searchDoctors/" element = {<SearchDoctorsPage/>}/>
            <Route path="/patient/appointments/" element={<PatientAppointments />} />
            <Route path="/patient/bills" element={<BillsPage />} />
            <Route path = "/admin/dashboard" element = {<Dashboard/>}/>
            <Route path = "/admin/login/" element = {<Login/>}/>
            <Route path = "/admin/register" element = {<Register/>} />
            <Route path = "/admin/approve-doctors" element = {<ApproveDoctors/>}/>
            <Route path="/admin/manage-doctors" element={<ManageDoctors />} />
            <Route path="/admin/schedule-shift" element={<ScheduleShift />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/login" element={<Login />} />
            <Route path="/doctor/register" element={<Register />} />
            <Route path="/doctor/shifts" element={<Shifts />} />
            <Route path="/doctor/appointments" element={<Appointment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

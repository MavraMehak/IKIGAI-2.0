import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import RegisterPatient from "./pages/RegisterPatient.js";
import Login from "./pages/Login.js";
import PatientDashboard from "./pages/PatientDashboard.js";
import PatientAppointments from "./pages/PatientAppointment.js";
import SearchDoctorsPage from "./pages/SearchDoctorsPage.js";
import BillsPage from "./pages/BillsPage.js";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;

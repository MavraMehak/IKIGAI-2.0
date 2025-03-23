import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ApproveDoctors from "./pages/ApproveDoctors";
import ManageDoctors from "./pages/ManageDoctors";
import ScheduleShift from "./pages/ScheduleShift";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path = "/admin/dashboard" element = {<Dashboard/>}/>
            <Route path = "/admin/login/" element = {<Login/>}/>
            <Route path = "/admin/register" element = {<Register/>} />
            <Route path = "/admin/approve-doctors" element = {<ApproveDoctors/>}/>
            <Route path="/admin/manage-doctors" element={<ManageDoctors />} />
            <Route path="/admin/schedule-shift" element={<ScheduleShift />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

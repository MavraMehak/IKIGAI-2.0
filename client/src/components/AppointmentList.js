import React from "react";
import "../styles/PatientLayout.css";

const AppointmentList = ({ appointments }) => {
  const pastAppointments = appointments.filter(
    (appt) => new Date(appt.appointment_date) < new Date()
  );
  const upcomingAppointments = appointments.filter(
    (appt) => new Date(appt.appointment_date) >= new Date()
  );

  return (
    <div className="container">
      <h2 className="appointments-section-title">Upcoming Appointments</h2>
      <div className="appointments-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingAppointments.length ? (
              upcomingAppointments.map((appt) => (
                <tr key={appt.appointment_id}>
                  <td>{appt.appointment_date}</td>
                  <td>{appt.start_time}</td>
                  <td>{appt.end_time}</td>
                  <td>{appt.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-appointments">No upcoming appointments</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="appointments-section-title">Past Appointments</h2>
      <div className="appointments-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pastAppointments.length ? (
              pastAppointments.map((appt) => (
                <tr key={appt.appointment_id}>
                  <td>{appt.appointment_date}</td>
                  <td>{appt.start_time}</td>
                  <td>{appt.end_time}</td>
                  <td>{appt.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-appointments">No past appointments</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;

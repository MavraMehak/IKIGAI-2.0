import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.image || "https://via.placeholder.com/150"} alt={doctor.first_name} />
      <h2>{doctor.first_name} {doctor.last_name}</h2>
      <p>{doctor.specialized}</p>
      <p>{doctor.gender}</p>
      <p>{doctor.mobile_number}</p>
    </div>
  );
};

export default DoctorCard;

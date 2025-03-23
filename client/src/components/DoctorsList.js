import DoctorCard from "./DoctorCard";

const DoctorsList = ({ doctors }) => {
  return (
    <div className="doctor-grid">
      {doctors.length > 0 ? (
        doctors.map((doctor) => <DoctorCard key={doctor._id} doctor={doctor} />)
      ) : (
        <p>No doctors found. Try adjusting your filters.</p>
      )}
    </div>
  );
};

export default DoctorsList;

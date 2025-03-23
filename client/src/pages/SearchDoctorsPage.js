import { useState, useEffect } from "react";
import axios from "axios";
import DoctorsList from "../components/DoctorsList";
import FilterBar from "../components/FilterBar";
import PatientLayout from "../components/PatientLayout";
import { Typography } from "antd";

const { Title } = Typography;

const SearchDoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [filters, setFilters] = useState({ name: "", specialized: "", gender: "" });

    useEffect(() => {
        axios.get("http://localhost:5000/api/doctors")
        .then((response) => {
            setDoctors(response.data);
            setFilteredDoctors(response.data);
        })
        .catch((error) => console.error("Error fetching doctors:", error));
    }, []);

    useEffect(() => {
        const filtered = doctors.filter(doctor =>
        (filters.name === "" || `${doctor.first_name} ${doctor.last_name}`.toLowerCase().includes(filters.name.toLowerCase())) &&
        (filters.specialized === "" || doctor.specialized.toLowerCase() === filters.specialized.toLowerCase()) &&
        (filters.gender === "" || doctor.gender.toLowerCase() === filters.gender.toLowerCase())
        );
        setFilteredDoctors(filtered);
    }, [filters, doctors]);

    return (
        <PatientLayout>
        <div className="search-doctors-page">
            <Title level={3} className="search-title">Search for a Doctor</Title>
            <FilterBar onFilterChange={setFilters} />
            <DoctorsList doctors={filteredDoctors} />
        </div>
        </PatientLayout>
    );
};

export default SearchDoctorsPage;

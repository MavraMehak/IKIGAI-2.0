import { useState, useEffect } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [name, setName] = useState("");
  const [specialized, setSpecialized] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    onFilterChange({ name, specialized, gender });
  }, [name, specialized, gender, onFilterChange]);

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select value={specialized} onChange={(e) => setSpecialized(e.target.value)}>
        <option value="">All Specializations</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Neurologist">Neurologist</option>
        <option value="Orthopedic">Orthopedic</option>
      </select>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
  );
};

export default FilterBar;

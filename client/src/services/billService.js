import axios from "axios";

const API_URL = "http://localhost:5000/api/bills";

export const fetchBills = async () => {
    try {
        const res = await axios.get(process.env.API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching bills:", error);
        return [];
    }
};

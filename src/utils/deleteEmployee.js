import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const deleteEmployee = async (e, id) => {
    try {
        e.preventDefault();
        const { data } = await axios.delete(
            `http://localhost:3000/users/${id}`,
            {
                headers: { 'Authorization': `${localStorage.getItem("token")}` }
            }
        );
    } catch (error) {
        console.log(error)
    }
};


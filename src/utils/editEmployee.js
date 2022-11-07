import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const editEmployee = async (e, id) => {
    try {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { data } = await axios.put(
            `http://localhost:3000/users/${id}`,
            {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                username: formData.get('username'),
                email: formData.get('email'),
                address: formData.get('address'),
                role: formData.get('role'),
                password: formData.get('password'),
            },

            {
                headers: { 'Authorization': `${localStorage.getItem("token")}` }
            }
        );
    } catch (error) {
        console.log(error)
    }
};
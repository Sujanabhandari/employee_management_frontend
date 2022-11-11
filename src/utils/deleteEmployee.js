import axios from "axios";

export const deleteEmployee = async (id) => {
    try {
        const response = await axios.delete(
            `http://localhost:3000/users/${id}`,
            {
                headers: { 'Authorization': `${localStorage.getItem("token")}` }
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};


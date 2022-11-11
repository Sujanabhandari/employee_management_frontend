import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { putData } from '../utils/auth';
import { useMainContext } from "../context/MainContext";
import EmployeeForm from './EmployeeForm';
import { toast } from 'react-toastify';
import { getFormData } from '../utils/form';
import { EmployeeFields } from '../model/employee';
import { useState } from 'react';
import { validateForm } from "../utils/validation";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditEmployee = ({ employee, show, onHide }) => {
    const { setEmployees } = useMainContext();
    const [errors, setErrors] = useState({
        email: false
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const formErrors = validateForm(formData);
            if (Object.values(formErrors).some(f => f === true)) {
                setErrors({ ...formErrors });
                return;
            }
            const response = await putData(`http://localhost:3000/users/${employee._id}`, getFormData(formData, EmployeeFields));
            setEmployees(current => current.map(emp => emp._id === employee._id ? { ...emp, ...response.data } : emp));
            toast.success("Employee is succesfully edited")
            setErrors(false);
            onHide();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal
                open={show}
                onClose={onHide}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Employee
                    </Typography>
                    <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
                        <EmployeeForm employee={employee} errors={errors} action="Edit"/>
                    </Grid>
                </Box>
            </Modal>

        </>
    )
}

export default EditEmployee;
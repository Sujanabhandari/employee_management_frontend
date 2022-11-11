import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import { useMainContext } from "../context/MainContext";
import { postData } from "../utils/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validation";
import EmployeeForm from './EmployeeForm';
import { getFormData } from '../utils/form';
import { EmployeeFields } from '../model/employee';

const AddEmployee = () => {
    const navigate = useNavigate();
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
            const { data, error } = await postData('/users', {
                users: [getFormData(formData, EmployeeFields)]
            });
            if (error) {
                throw new Error(error.response?.data.error || error.message);
            }
            setEmployees((prev) => [...data, ...prev]);
            toast.success("Employee is succesfully added")
            navigate('/');

        } catch (error) {
            toast(error.message)
        }
    };

    return (
        <Container maxWidth="sm" m="5" sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Add new Employee
            </Typography>
            <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
                <EmployeeForm errors={errors} action="Add" />
            </Grid>
        </Container>
    );
}

export default AddEmployee;

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { useMainContext } from "../context/MainContext";
import { postData } from "../utils/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validation";

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
            const { data, error } = await postData(`http://localhost:3000/users`, {
                users: [{
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    username: formData.get('username'),
                    email: formData.get('email'),
                    address: formData.get('address'),
                    role: formData.get('role'),
                    street: formData.get('street'),
                    city: formData.get('city'),
                    country: formData.get('country'),
                    housenumber: formData.get('housenumber'),
                    postcode: formData.get('postcode'),
                }]
            });
            if (error) {
                throw new Error(error.response?.data.error || error.message);
            }
            setEmployees((prev) => [...data, ...prev]);
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        autoFocus />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="username"
                        name="username"
                        label="Username"
                        fullWidth
                        autoComplete="Username"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={errors?.email}
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        type="email"
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        id="street"
                        name="street"
                        label="Street"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="housenumber"
                        name="number"
                        label="House number"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="city"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="country"
                        variant="standard" />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="role"
                        name="role"
                        label="Your role in Company"
                        fullWidth
                        autoComplete="Role"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="secondary">Add</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AddEmployee;
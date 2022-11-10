import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { useAuthContext } from "../context/AuthContext";
import { register, postData } from "../utils/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddEmployee = () => {
    const navigate = useNavigate();
    const { setEmployees } = useAuthContext();
    const [array, setArray] = useState([]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const response = await postData(`http://localhost:3000/users`, {
                users: [{
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    username: formData.get('username'),
                    email: formData.get('email'),
                    address: formData.get('address'),
                    role: formData.get('role'),
                    password: formData.get('password')
                }]
            });
            console.log(response);
            setEmployees((prev) => [...prev, ...response.data]);
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" gutterBottom>
                Add new Employee
            </Typography>
            <Grid container spacing={3} component="form" noValidate onSubmit={handleSubmit}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
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
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        autoComplete="address"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
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
                    <TextField
                    required
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        autoComplete="password"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">Add</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AddEmployee;
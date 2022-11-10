import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { useMainContext } from "../context/MainContext";
import { register, postData } from "../utils/auth";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Box from '@mui/material/Box';
import { toast } from "react-toastify";

const AddEmployee = () => {
    const navigate = useNavigate();
    const { setEmployees } = useMainContext();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const {data, error} = await postData(`http://localhost:3000/users`, {
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
            setEmployees((prev) => [...prev, ...data]);
            navigate('/');

        } catch (error) {
            toast(error.message)
        }
    };

    return (
        <Container maxWidth="sm" m="5" sx={{marginTop:"100px"}}>
            <Typography variant="h6" gutterBottom>
                Add new Employee
            </Typography>
            <Grid container spacing={3} component="form" onSubmit={handleSubmit}>
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
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="street"
                        name="street"
                        label="Street"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="housenumber"
                        name="number"
                        label="House number"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        fullWidth
                        variant="standard" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="family-name"
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
                    <Button variant="contained" type="submit">Add</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AddEmployee;
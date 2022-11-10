import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { putData } from '../utils/auth';
import { useAuthContext } from "../context/AuthContext";

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
    const { setEmployees } = useAuthContext();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const changedEmployee = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                userName: formData.get('userName'),
                email: formData.get('email'),
                address: formData.get('address'),
                role: formData.get('role'),
                password: formData.get('password'),
            };
            const response = await putData(`http://localhost:3000/users/${employee._id}`, changedEmployee);
            setEmployees(current => current.map(emp => emp._id === employee._id ? {...emp, ...response.data} : emp));
            onHide();
        } catch (error) {
            console.log(error)
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First name"
                                defaultValue={employee.firstName}
                                fullWidth
                                autoComplete="given-name"
                                variant="standard" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="lastName"
                                name="lastName"
                                label="Last name"
                                defaultValue={employee.lastName}
                                fullWidth
                                autoComplete="family-name"
                                variant="standard" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="userName"
                                name="userName"
                                label="userName"
                                defaultValue={employee.userName}
                                fullWidth
                                autoComplete="userName"
                                variant="standard" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address"
                                name="address"
                                label="Address"
                                defaultValue={employee.address}
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
                                defaultValue={employee.email}
                                variant="standard" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="role"
                                name="role"
                                label="Your role in Company"
                                fullWidth
                                autoComplete="Role"
                                defaultValue={employee.role}
                                variant="standard" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit">Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </>
    )
}

export default EditEmployee;
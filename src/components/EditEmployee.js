import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Container } from '@mui/material';
import React, { useState, useEffect } from "react";

const EditEmployee = ({type, handleFunction, employee}) => {
    console.log(handleFunction);
    return (
        <>
            <Grid container spacing={3} component="form" noValidate onSubmit={handleFunction}>
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
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Password"
                        fullWidth
                        autoComplete="password"
                        variant="standard" />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">{type}</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default EditEmployee;

import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { register } from "../utils/auth";
import { Link } from "@mui/material";
import { toast } from "react-toastify";

const SignUp = () => {
    const { setToken } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const { data, error } = await register({
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                userName: formData.get('userName'),
                email: formData.get('email'),
                address: formData.get('address'),
                role: formData.get('role'),
                password: formData.get('password'),
            });
            if (error) {
                throw new Error(error.response?.data.error || error.message);
              }
            localStorage.setItem("token", data.token);
            setToken(data.token);
            toast('Congratulations Your Account is Created', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
              });
            navigate('/login', { replace: true });
        }
        catch (error) {
            toast.error(error.response?.data.error);
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="userName"
                                    label="UserName"
                                    type="text"
                                    id="userName"
                                    autoComplete="new-userName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                    autoComplete="new-address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="role"
                                    label="Role"
                                    type="text"
                                    id="role"
                                    autoComplete="new-role"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} underline='hover' color='inheirt' to="/login">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default SignUp;
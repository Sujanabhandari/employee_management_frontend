
import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as RouterLink } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { register } from "../utils/auth";
import { Link } from "@mui/material";
import { toast } from "react-toastify";
import { validateForm } from "../utils/validation";

const SignUp = () => {
    const { setToken } = useMainContext();
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState({
        email: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const formErrors = validateForm(formData);
            if (Object.values(formErrors).some(f => f === true)) {
                setErrors({...formErrors});
                return;
            }
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
            toast('Congratulations Your Account is Created', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
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
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        m: 1,
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="lastName"
                                id="lastName"
                                label="Last Name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="userName"
                                id="userName"
                                label="Username"
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors?.email}
                                required
                                fullWidth
                                name="email"
                                id="email"
                                label="Email Address"
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="address"
                                id="address"
                                label="Address"
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="role"
                                id="role"
                                label="Role"
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                id="password"
                                label="Password"
                                type="password"
                                inputProps={{ minLength: 8 }}
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
            </Container>
        </>
    );
}

export default SignUp;
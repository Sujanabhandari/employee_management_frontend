import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMainContext } from "../context/MainContext";
import { loginUser, getUserContext } from '../utils/auth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Link from '@mui/material/Link';

export default function SignIn() {

  const { setIsAuthenticated, setToken, setUser, } = useMainContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      if (!formData.get('email') || !formData.get('email')) {
        toast.warn("Please fill out all the fields");
        return;
      }
      const { data, error } = await loginUser({ email: formData.get('email'), password: formData.get('password') });

      if (error) {
        throw new Error(error.response?.data.error || error.message);
      }
      setUser(getUserContext);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      toast('Welcome to home page', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      navigate('/', { replace: true });

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (

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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} underline='hover' color='inheirt' to="/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>

  )
};
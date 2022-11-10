import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuthContext } from "../context/AuthContext";
import { useState } from 'react';
import { loginUser, getUserContext} from '../utils/auth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const theme = createTheme();

export default function SignIn() {

  const { setIsAuthenticated,isAuthenticated,  setToken, user, setUser,} = useAuthContext();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      if (!formData.get('email') || !formData.get('email')) alert("Please fill out all the fields");
      const { data, error } = await loginUser({ email: formData.get('email'), password: formData.get('password') });
      if (error) {
        throw new Error(error.response?.data.error || error.message);
      }

        setUser(getUserContext);
        console.log(user);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsAuthenticated(true);
        navigate('/', { replace: true });

    } catch (error) {
      console.log("From Error", error);
      toast.error(error.message);
      setIsError(true);
    }
  };

  return  (
  
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

          <Typography variant="h4">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
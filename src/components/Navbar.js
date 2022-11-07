import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Link from '@mui/material/Link';
import CsvUpload from './CsvUpload';

export default function Navbar({logout}) {
    const { user,
        setUser,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        } = useAuthContext();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" underline="none" href={isAuthenticated ? '/': '/login'}>Employee Registry</Link>
          </Typography>
          {isAuthenticated ? (
          <>
          <Link color="inherit" mr={2} underline="none" href="/upload">Import Employee</Link>
          <Link color="inherit" mr={2} underline="none" href="/addEmployee">Add Employee</Link>
          <Button color="inherit" onClick={logout}>Logout</Button>
          </>):(
            <Link color="inherit" underline="none" href="/login">SignIn</Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

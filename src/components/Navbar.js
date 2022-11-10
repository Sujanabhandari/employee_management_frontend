import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
// import Link from '@mui/material/Link';
import CsvUpload from './CsvUpload';
import { Modal } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ logout }) {
  const { isAuthenticated } = useAuthContext();
  const [modalShow, setModalShow] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link underline="none" style={{ color: '#FFF' }} to={isAuthenticated ? '/' : '/login'}>Employee Registry</Link>
          </Typography>
          {isAuthenticated ? (
            <>
              <Link mr={2} style={{ color: '#FFF', marginRight:'20px' }} underline="none" to="/upload">Import Employee</Link>
              <Link style={{ color: '#FFF', marginRight:'20px'}} underline="none" to="/addEmployee">Add Employee</Link>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>) : (
            <Button component={Link} color="inherit" to={'/login'}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
} 

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuthContext } from "../context/AuthContext";
import Link from '@mui/material/Link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Link as RouterLink
} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar({ logout }) {
  const { isAuthenticated } = useAuthContext();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} underline="none" style={{ color: '#FFF' }} to={isAuthenticated ? '/' : '/login'}>Badumts GmbH</Link>
          </Typography>
          {isAuthenticated ? (
            <>
              <Link component={RouterLink} mr={2}
                style={{ marginRight: '20px' }} color="inherit"
                underline="none" to="/upload">
                <UploadFileIcon fontSize="large"/>
              </Link>
              <Link component={RouterLink} color="inherit" style={{ marginRight: '20px' }}
                underline="none" to="/addEmployee"> 
                <PersonAddIcon  fontSize="large"
                 /> 
              </Link>
              <Button color="inherit" onClick={logout}><LogoutIcon fontSize="large"/></Button>
            </>) : (
            <Link component={RouterLink} style={{ color: '#FFF', marginRight: '20px' }} underline="none" to='/login'>Login</Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
} 

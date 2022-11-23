import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMainContext } from "../context/MainContext";
import Link from '@mui/material/Link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import {
  Link as RouterLink
} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react';
import { debounce, result } from 'lodash';

export default function Navbar({ logout }) {
  const { isAuthenticated, employees, setEmployees, prevEmployees } = useMainContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = debounce(e => {
    console.log(e.target.value)
    setSearchQuery(e.target.value);
  }, 150);

  useEffect(() => {
    if (searchQuery) {
      console.log("Search Query", searchQuery)
      const result = employees.filter(employee =>
        employee?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) || employee?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
        || employee?.userName?.toLowerCase().includes(searchQuery.toLowerCase()) || employee?.role?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setEmployees(result);
    }
    else {
      setEmployees(prevEmployees);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} underline="none" color="inherit" to={isAuthenticated ? '/' : '/login'}>Badumts GmbH</Link>
          </Typography>
          {isAuthenticated ? (
            <>
              <TextField
                id="search-bar"
                className="text"
                onChange={handleChange}
                label="Search Employee"
                variant="outlined"
                color="secondary"
                placeholder="Search..."
                size="small"
              />
              <IconButton type="submit" aria-label="search" color="inherit">
                <SearchIcon />
              </IconButton>
              <Link component={RouterLink} mr={2}
                style={{ marginRight: '20px' }} color="inherit"
                underline="none" to="/upload">
                <UploadFileIcon fontSize="large" />
              </Link>
              <Link component={RouterLink} color="inherit" style={{ marginRight: '20px' }}
                underline="none" to="/addEmployee">
                <PersonAddIcon fontSize="large"
                />
              </Link>
              <Button color="inherit" onClick={logout}><LogoutIcon fontSize="large" /></Button>
            </>) : (
            <Link component={RouterLink} color="inherit"
              style={{ marginRight: '20px' }} underline="none" to='/login'>Login</Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
} 

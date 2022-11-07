import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Employees from "./Employees";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user, employee, isAuthenticated } = useAuthContext();
  console.log("Employee List", employee);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (!isAuthenticated) navigate('/login', { replace: true });
  // }, [isAuthenticated]);

  return (
    <Container maxWidth="sm">
      <Employees />
    </Container>
  );
};

export default Home;

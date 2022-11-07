import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Employees from "./Employees";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { user, employees, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   if (!isAuthenticated) navigate('/login', { replace: true });
  // }, [isAuthenticated]);

  return (
    <Container>
      <Employees />
    </Container>
  );
};

export default Home;

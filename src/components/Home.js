import React from "react";
import { useMainContext } from "../context/MainContext";
import Employees from "./Employees";
import Container from '@mui/material/Container';
import SignIn from "./SignIn";

const Home = () => {
  const { isAuthenticated } = useMainContext();
  return (
    <Container>
      {isAuthenticated ? <Employees /> : <SignIn />}
    </Container>
  );
};

export default Home;

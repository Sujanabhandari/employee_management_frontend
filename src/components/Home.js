import React from "react";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const Home = () => {
  const { user, employee } = useAuthContext();
  console.log("Employee List", employee);
  return (
    <div>
      <h1>Welcome to my amazing website</h1>
    </div>
  );
};

export default Home;

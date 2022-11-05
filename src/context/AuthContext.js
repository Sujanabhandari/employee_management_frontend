import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

import {
  getFromLocalStorage,
  getUserContext,
  saveToLocalStorage,
} from "../utils/auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  // get token from local storage if exists
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [registerFormState, setRegisterFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    address: "",
    role: "",
    password: "",
    profile_pic: null,
  });

  useEffect(() => {

    const validateToken = async () => {
      try {
        const { data, error } = await getUserContext(token);
        if (error) {
          throw new Error(error.response?.data.error || error.message);
        }
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {  
        console.log(error)
      }
    };
    token && validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); 

  return (
    <AuthContext.Provider
      value={{
        registerFormState,
        setRegisterFormState,
        setToken,
        isAuthenticated,setUser,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider };

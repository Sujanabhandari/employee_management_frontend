import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import {
  getData,
  getUserContext,
} from "../utils/auth";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [prevEmployees, setPrevEmployees] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    address: "",
    role: "",
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
        console.log(error);
      }
    };
    token && validateToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); 

  
  useEffect(() => {
    const getEmployee = async () => {
      if(!isAuthenticated) return ;
      try {
          const { data } = await getData(`/users`);
          setPrevEmployees(data);
          setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployee();
  }, [isAuthenticated]);


  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        setToken,
        isAuthenticated,
        setIsAuthenticated,
        employees,
        setEmployees,
        prevEmployees,
        setPrevEmployees
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => useContext(MainContext);

export { useMainContext, MainContextProvider };

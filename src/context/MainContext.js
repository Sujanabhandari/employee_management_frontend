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
  
  const [pageLimit, setPageLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCountState, setRowCountState] = useState(0);

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

  console.log("page", page)
  useEffect(() => {
    const getEmployee = async () => {
      if(!isAuthenticated) return ;
      try {
          const { data } = await getData(`/users?page=${page+1}&limit=${pageSize}`);
          console.log("Employee", data.hits);
          setRowCountState(data.hits)
          setPrevEmployees(data.results);
          setEmployees(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployee();
  }, [isAuthenticated, page, pageSize]);


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
        setPrevEmployees,
       page, setPage, setPageLimit, setPageSize, rowCountState
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

const useMainContext = () => useContext(MainContext);

export { useMainContext, MainContextProvider };

import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import GlobalLayout from './components/GlobalLayout';
import ProtectedLayout from './components/ProtectedRoute';
import { useMainContext } from './context/MainContext';
import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";
import AddEmployee from './components/AddEmployee';
import SingleEmployee from './components/SingleEmployee';
import EditEmployee from './components/EditEmployee';
import CsvUpload from './components/CsvUpload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './themes/theme';

function App() {
  const { setUser, setToken, isAuthenticated, setIsAuthenticated,setEmployees, token } = useMainContext();
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setEmployees([]);
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    navigate('/login', { replace: true });
  };
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <ToastContainer limit={5} />
      <Navbar isAuthenticated={isAuthenticated}
        setToken={setToken} logout={logout} />
      <Routes>
        <Route path="/" element={<GlobalLayout />} >
          <Route
            index
            element={
              <ProtectedLayout isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedLayout> 
            }
          />
          <Route
            path="/employee/:id"
            element={
              <ProtectedLayout isAuthenticated={isAuthenticated}>
                <SingleEmployee />
              </ProtectedLayout> 
            }
          />
          <Route
            path="/editemployee"
            element={
              <ProtectedLayout isAuthenticated={isAuthenticated}>
                <EditEmployee />
              </ProtectedLayout> 
            }
          />
          <Route
            path="/addEmployee"
            element={
              <ProtectedLayout isAuthenticated={isAuthenticated}>
                <AddEmployee />
              </ProtectedLayout> 
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedLayout isAuthenticated={isAuthenticated}>
                <CsvUpload />
              </ProtectedLayout> 
            }
          />
          <Route path="/login" element={<SignIn />} />
          <Route index path="/register" element={<SignUp />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

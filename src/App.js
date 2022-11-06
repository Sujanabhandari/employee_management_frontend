import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import ProtectedLayout from './components/ProtectedRoute';
import GlobalLayout from './components/GlobalLayout';
import { useAuthContext } from './context/AuthContext';
import Navbar from './components/Navbar'
import { useNavigate } from "react-router-dom";
import AddEmployee from './components/AddEmployee';
import SingleEmployee from './components/SingleEmployee';
import Employee from './components/Employees';
import EditEmployee from './components/EditEmployee';
function App() {
  const { setUser, setToken, isAuthenticated, setIsAuthenticated,setEmployee,token } = useAuthContext();
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setEmployee([]);
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    navigate('/login', { replace: true });
  };
  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated}
        setToken={setToken} logout={logout} />
      <Routes>
        <Route path="/" element={<GlobalLayout />} >
          <Route index element={<Home />} />
          {/* <Route path="/employee" element={<Employee />} /> */}
          <Route path="/employee/:id" element={<SingleEmployee />} />
          <Route path="/editemployee" element={<EditEmployee/>} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/login" element={<SignIn />} />
          <Route index path="/register" element={<SignUp />} />
          {/* <Route path='secret' element={<ProtectedLayout isAuthenticated={isAuthenticated} />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import ProtectedLayout from './components/ProtectedRoute';
import GlobalLayout from './components/GlobalLayout';
import { useAuthContext } from './context/AuthContext';

import { useNavigate } from "react-router-dom";
function App() {
  const { setUser, setToken, isAuthenticated, setIsAuthenticated, posts } = useAuthContext();
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    navigate('/', { replace: true });
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GlobalLayout />} >
          <Route index element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

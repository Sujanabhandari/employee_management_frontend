import axios from 'axios';

const register = async (userData) => {
  const response = await axios.post(`http://localhost:3000/users/signup`, userData);
  return response;
};

const loginUser = async (userData) => {

  try {
    const response = await axios.post(
      `http://localhost:3000/users/signin`,
      userData
    );
    return response;
  } catch (error) {
    return { error };
  }
};

const getUserContext = async (token) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/users/me`, {
      headers: { Authorization: token }
    });
    return { data };
  } catch (error) {
    console.log(error);
  }
};

const saveToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

const getFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  return token || null;
};

const removeFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export {
  register,
  loginUser,
  getUserContext,
  getFromLocalStorage,
  saveToLocalStorage,
  removeFromLocalStorage,
};

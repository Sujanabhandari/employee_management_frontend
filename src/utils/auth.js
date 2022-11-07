import axios from 'axios';
import { useAuthContext } from "../context/AuthContext";

const register = async (userData) => {
  const response = await axios.post(`http://localhost:3000/users/signup`, userData);
  return response;
};

const postData = async (url, userData) => {
  const response = await axios.post(url, userData , {
    headers: { Authorization: localStorage.getItem("token") }
  });

  return response;
};

const putData = async (url, userData) => {
  const response = await axios.put(url, userData , {
    headers: { Authorization: localStorage.getItem("token") }
  });
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
  postData,
  putData
};

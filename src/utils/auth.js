import axios from 'axios';

const baseUrl = "http://localhost:3000";

const register = async (userData) => {
  const response = await axios.post(`${baseUrl}/signup`, userData);
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

const getData = async (url) => {
  const response = await axios.get(url , {
    headers: { Authorization: localStorage.getItem("token") }
  });

  return response;
};

const loginUser = async (userData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/signin`,
      userData
    );
    return response;
  } catch (error) {
    return { error };
  }
};

const getUserContext = async (token) => {
  try {
    const { data } = await axios.get(`${baseUrl}/users/me`, {
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
  putData,
  getData
};

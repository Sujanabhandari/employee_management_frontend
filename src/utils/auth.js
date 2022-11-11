import axios from 'axios';

const baseUrl = process.env.REACT_APP_SERVER_BASE_URL;

const register = async (userData) => {
  const response = await axios.post(`${baseUrl}/signup`, userData);
  return response;
};

const postData = async (url, userData) => {
  const response = await axios.post(`${baseUrl}${url}`, userData , {
    headers: { Authorization: localStorage.getItem("token") }
  });

  return response;
};

const putData = async (url, userData) => {
  const response = await axios.put(`${baseUrl}${url}`, userData , {
    headers: { Authorization: localStorage.getItem("token") }
  });
  return response;
};

const deleteEmployee = async (id) => {
  try {
      const response = await axios.delete(
          `${baseUrl}/users/${id}`,
          {
              headers: { 'Authorization': `${localStorage.getItem("token")}` }
          }
      );
      return response;
  } catch (error) {
      console.log(error);
  }
};



const getData = async (url) => {
  const response = await axios.get(`${baseUrl}${url}`, {
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

export {
  baseUrl,
  register,
  loginUser,
  getUserContext,
  postData,
  putData,
  getData,
  deleteEmployee
};

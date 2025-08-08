import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Generic GET
export const getRequest = async (url) => {
  const res = await axiosInstance.get(url);
  return res.data.message || res.data.data || res.data;
};

// Generic POST
// utils/api.js
export const postRequest = async (url, body = {}) => {
  const res = await axiosInstance.post(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data.data || res.data.message || res.data;
};

export const deleteRequest = async (url) => {
  const res = await axiosInstance.get(url);
  return res.data;
};

export const putRequest = async (url, body = {}) => {
  const res = await axiosInstance.put(url, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export default axiosInstance;

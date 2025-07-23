import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
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
export const postRequest = async (url, body = {}) => {
  const res = await axiosInstance.post(url, body);
  return res.data.data;
};

export default axiosInstance;
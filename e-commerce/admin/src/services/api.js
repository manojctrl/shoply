import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// For admin, we can automatically seed token or use a static admin token if logged in.
// We can check user info in local storage.
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

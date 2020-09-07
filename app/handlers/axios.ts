import axios from "axios";

const axiosInstance = axios.create({
  timeout: 1000,
  headers: { "User-Agent": "TeamCorax" },
});

export default axiosInstance;

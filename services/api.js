import { getCookie } from "@/utils/cookie";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6500",
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

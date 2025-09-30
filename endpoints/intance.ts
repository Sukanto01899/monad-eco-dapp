import axios from "axios";

export const authApi = axios.create({
  baseURL: "/api/secure",
  withCredentials: true,
});

import axios from "axios";

const instance = axios.create({
  baseURL: "",
  timeout: 2000,
  headers: {},
});

instance.interceptors.request.use((config) => {
  
});
// instance.request

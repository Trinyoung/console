
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { message } from "antd";
import { BASE_URL } from "../config";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Do something before request is sent
    return config;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data;
  },
  (err) => {
    if (err.response && err.response.data && err.response.data.message) {
      message.error(err.response.data.message);
    } else {
      message.error(err.message);
    }
    return Promise.reject(err);
  }
);

// 封装通用的请求方法
export default function request<T>(config: AxiosRequestConfig): Promise<T> {
  return new Promise((resolve, reject) => {
    instance
      .request<any, AxiosResponse<T>>(config)
      .then((res) => {
        return resolve(res as T);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

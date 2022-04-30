import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: "https://reqres.in/api",
  timeout: 1000,
};

const axiosInstance: AxiosInstance = axios.create(axiosRequestConfig);

axiosInstance.interceptors.response.use((response) => response.data);

export default axiosInstance;
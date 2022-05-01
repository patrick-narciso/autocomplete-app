import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
  timeout: 1000,
};

const axiosInstance: AxiosInstance = axios.create(axiosRequestConfig);

export default axiosInstance;
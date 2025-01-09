// lib/axios-client.ts
import axios from "axios";
import { CustomError } from "./CustomError";
const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
};
// console.log(options);

const API = axios.create({ ...options });

export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  //   async (error) => {
  //     console.log(error);

  //     const { data, status } = error.response;
  //     console.log(data, "data");
  //     if (data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401) {
  //       try {
  //         await APIRefresh.get("/auth/refresh");
  //         return APIRefresh(error.config);
  //       } catch (error) {
  //         window.location.href = "/";
  //       }
  //     }
  //     return Promise.reject({
  //       ...data,
  //     });
  //   }
  (error) => {
    // Handle errors
    if (error.response) {
      const { status, data } = error.response;

      // Create a CustomError instance
      const customError = new CustomError(
        status,
        data.message || "An error occurred",
        data.errors || []
      );

      return Promise.reject(customError);
    }

    // Handle network errors or unexpected errors
    return Promise.reject(new CustomError(500, "Network Error"));
  }
);
export default API;

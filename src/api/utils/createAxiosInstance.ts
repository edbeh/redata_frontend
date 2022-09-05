import axios from "axios";

import { getJwtTokenLocalStorage, signOut } from "utils";
import { PUBLIC_ENDPOINTS, BASE_API_URL } from "api/endpoints";

export const createAxiosInstance = () => {
  const newInstance = axios.create({ baseURL: BASE_API_URL });

  newInstance.interceptors.request.use(
    (request: any) => {
      if (PUBLIC_ENDPOINTS.find((route) => request?.url?.includes(route))) {
        return request;
      }

      const token = getJwtTokenLocalStorage();
      request.headers["Authorization"] = `Bearer ${token}`;
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  newInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error && error.response.status === 401) {
        signOut();
      }

      if (error.response.status > 300) {
        throw error;
      }
    }
  );

  return newInstance;
};

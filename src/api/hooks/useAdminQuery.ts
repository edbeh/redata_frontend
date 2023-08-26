import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";

import { USERS_BY_ADMIN_API_KEY } from "api/keys";
import { createAxiosInstance, ApiErrorProps } from "api/utils";
import { IAdminLoginFormFields } from "pages/Auth/AdminLogin/AdminLoginForm/AdminLoginForm.model";

import {
  ADMIN_LIST_USERS_ENDPOINT,
  ADMIN_SESSION_API_ENDPOINT,
} from "../endpoints";
import { GetUsersByAdmin, PostAdminSession } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 *  //*POST Session
 */
const submitAdminSession = async (data: IAdminLoginFormFields) => {
  return AxiosInstance.post<PostAdminSession.ApiResponse>(
    ADMIN_SESSION_API_ENDPOINT,
    data
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitAdminSession = () => {
  return useMutation(submitAdminSession);
};

/**
 * //*GET Users
 */
const fetchUsersByAdmin = async () => {
  return AxiosInstance.get<GetUsersByAdmin.ApiResponse>(
    ADMIN_LIST_USERS_ENDPOINT
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchUsersByAdmin = () => {
  return useQuery([USERS_BY_ADMIN_API_KEY], fetchUsersByAdmin, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

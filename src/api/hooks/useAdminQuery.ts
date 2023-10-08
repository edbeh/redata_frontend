import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";

import {
  PENDING_USERS_BY_ADMIN_API_KEY,
  USERS_BY_ADMIN_API_KEY,
} from "api/keys";
import { createAxiosInstance, ApiErrorProps } from "api/utils";
import { IAdminLoginFormFields } from "pages/Auth/AdminLogin/AdminLoginForm/AdminLoginForm.model";

import {
  ADMIN_LIST_PENDING_USERS_ENDPOINT,
  ADMIN_LIST_USERS_ENDPOINT,
  ADMIN_SESSION_API_ENDPOINT,
  ADMIN_USER_BY_ID_API_ENDPOINT,
} from "../endpoints";
import {
  GetPendingUsersByAdmin,
  GetUserByAdminById,
  GetUsersByAdmin,
  PostAdminSession,
  PostAdminUser,
} from "../models";

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

/**
 *  //*GET User By Id
 */
const fetchUserByAdminById = async (userId: string) => {
  return AxiosInstance.get<GetUserByAdminById.ApiResponse>(
    ADMIN_USER_BY_ID_API_ENDPOINT(userId)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchUserByAdminById = (userId: string, enabled = false) => {
  return useQuery(
    [USERS_BY_ADMIN_API_KEY, userId],
    () => fetchUserByAdminById(userId),
    {
      enabled,
    }
  );
};

/**
 * //*GET Pending Users
 */
const fetchPendingUsersByAdmin = async () => {
  return AxiosInstance.get<GetPendingUsersByAdmin.ApiResponse>(
    ADMIN_LIST_PENDING_USERS_ENDPOINT
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchPendingUsersByAdmin = () => {
  return useQuery([PENDING_USERS_BY_ADMIN_API_KEY], fetchPendingUsersByAdmin, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 *  //*POST New Invitation
 */
const submitNewInvitation = async (data: PostAdminUser.PayLoad) => {
  return AxiosInstance.post<PostAdminUser.ApiResponse>(
    ADMIN_LIST_USERS_ENDPOINT,
    data
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitNewInvitation = () => {
  return useMutation(submitNewInvitation);
};

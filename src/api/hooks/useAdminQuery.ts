import { toast } from "react-toastify";
import { useMutation } from "react-query";

import { createAxiosInstance, ApiErrorProps } from "api/utils";
import { IAdminLoginFormFields } from "pages/Auth/AdminLogin/AdminLoginForm/AdminLoginForm.model";

import { ADMIN_SESSION_API_ENDPOINT } from "../endpoints";
import { PostAdminSession } from "../models";

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

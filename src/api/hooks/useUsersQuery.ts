import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { createAxiosInstance, ApiErrorProps } from "api/utils";

import { USERS_API_KEY } from "../keys";
import { USERS_API_ENDPOINT } from "../endpoints";
import { PostUser } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 *  //*GET Users
 */
const fetchAllUsers = async () => {
  return AxiosInstance.get(USERS_API_ENDPOINT).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchAllUsers = () => {
  return useQuery([USERS_API_KEY], fetchAllUsers);
};

/**
 *  //*POST Users
 */
const submitUser = async (data: PostUser.PayLoad) => {
  return AxiosInstance.post<PostUser.ApiResponse>(
    USERS_API_ENDPOINT,
    data
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitUser = () => {
  return useMutation(submitUser);
};

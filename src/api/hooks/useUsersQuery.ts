import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { createAxiosInstance, ApiErrorProps } from "api/utils";

import { USERS_API_KEY } from "../keys";
import { USERS_API_ENDPOINT, USERS_BY_ID_API_ENDPOINT } from "../endpoints";
import { GetUserById, PostUser } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 *  //*GET All Users
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
 *  //*GET User By Id
 */
const fetchUserById = async (userId: string) => {
  return AxiosInstance.get<GetUserById.ApiResponse>(
    USERS_BY_ID_API_ENDPOINT(userId)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchUserById = (userId: string, enabled = false) => {
  return useQuery([`${USERS_API_KEY}_${userId}`], () => fetchUserById(userId), {
    enabled,
  });
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

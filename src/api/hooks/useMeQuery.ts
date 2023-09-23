import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { ApiErrorProps, createAxiosInstance } from "api/utils";

import { ME_API_KEY } from "../keys";
import { ME_API_ENDPOINT } from "../endpoints";
import { GetMe, PutMe } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Me
 */
const fetchMe = async () => {
  return AxiosInstance.get<GetMe.ApiResponse>(ME_API_ENDPOINT).catch(
    (error) => {
      const { errors } = error.response?.data as ApiErrorProps;
      errors?.length > 0
        ? toast.error(errors[0].detail)
        : toast.error(error.response.statusText);
      throw error;
    }
  );
};

export const useFetchMe = (enabled = true) => {
  return useQuery([ME_API_KEY], fetchMe, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled,
  });
};

/**
 * //*PUT Me
 */
const updateMe = async (data: PutMe.PayLoad) => {
  return AxiosInstance.put<PutMe.ApiResponse>(ME_API_ENDPOINT, data).catch(
    (error) => {
      const { errors } = error.response?.data as ApiErrorProps;
      errors?.length > 0
        ? toast.error(errors[0].detail)
        : toast.error(error.response.statusText);
      throw error;
    }
  );
};

export const useUpdateMe = (onSuccess?: () => void) => {
  return useMutation(updateMe, {
    onSuccess,
  });
};

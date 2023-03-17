import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { createAxiosInstance, ApiErrorProps } from "api/utils";

import { STUDIES_API_KEY } from "../keys";
import { STUDIES_API_ENDPOINT } from "../endpoints";
import { DeleteStudies, GetStudies, PostStudies } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 *  //*GET Studies
 */
const fetchAllStudies = async () => {
  return AxiosInstance.get<GetStudies.ApiResponse>(STUDIES_API_ENDPOINT).catch(
    (error) => {
      const { errors } = error.response?.data as ApiErrorProps;
      errors?.length > 0
        ? toast.error(errors[0].detail)
        : toast.error(error.response.statusText);
      throw error;
    }
  );
};

export const useFetchAllStudies = () => {
  return useQuery([STUDIES_API_KEY], fetchAllStudies);
};

/**
 *  //*POST Studies
 */
const submitStudies = async (data: PostStudies.PayLoad[]) => {
  return AxiosInstance.post<PostStudies.ApiResponse>(STUDIES_API_ENDPOINT, {
    data,
  }).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitStudies = (onSuccess: () => void) => {
  return useMutation(submitStudies, {
    onSuccess,
  });
};

/**
 *  //*DELETE Studies
 */
const removeStudies = async (data: DeleteStudies.PayLoad) => {
  return AxiosInstance.delete<DeleteStudies.ApiResponse>(STUDIES_API_ENDPOINT, {
    data,
  }).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useRemoveStudies = (onSuccess: () => void) => {
  return useMutation(removeStudies, {
    onSuccess,
  });
};

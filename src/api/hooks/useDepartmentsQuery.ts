import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { ApiErrorProps, createAxiosInstance } from "api/utils";

import { DEPARTMENTS_API_KEY } from "../keys";
import { DEPARTMENTS_API_ENDPOINT } from "../endpoints";
import { GetDepartmentById } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Department by Id
 */
const fetchDepartmentById = async (id: string) => {
  return AxiosInstance.get<GetDepartmentById.ApiResponse>(
    DEPARTMENTS_API_ENDPOINT(id)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchDepartmentById = (
  id: string,
  enabled: boolean = false
) => {
  return useQuery([DEPARTMENTS_API_KEY, id], () => fetchDepartmentById(id), {
    enabled,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

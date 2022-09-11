import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { createAxiosInstance } from "api/utils/createAxiosInstance";

import { DEPARTMENTS_API_KEY } from "../keys";
import { DEPARTMENTS_API_ENDPOINT } from "../endpoints";
import { GetDepartmentById } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Me
 */
const fetchDepartmentById = async (id: string) => {
  return AxiosInstance.get<GetDepartmentById.ApiResponse>(
    `${DEPARTMENTS_API_ENDPOINT}?institution_id=${id}`
  ).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchDepartmentById = (
  id: string,
  enabled: boolean = false
) => {
  return useQuery(
    [`${DEPARTMENTS_API_KEY}_${id}`],
    () => fetchDepartmentById(id),
    {
      enabled,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );
};

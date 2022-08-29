import axios from "axios";
import { toast } from "react-toastify";
import { useQuery, UseQueryOptions } from "react-query";

import { DEPARTMENTS_API_KEY } from "../keys";
import { DEPARTMENTS_API_ENDPOINT } from "../endpoints";
import { GetDepartmentById } from "../models";

/**
 * //*GET Me
 */
const fetchDepartmentById = async (id: string) => {
  return axios
    .get<GetDepartmentById.ApiResponse>(
      `${DEPARTMENTS_API_ENDPOINT}?institution_id=${id}`
    )
    .catch((error) => {
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
    { enabled }
  );
};

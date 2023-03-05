import { toast } from "react-toastify";
import { useQuery } from "react-query";
import axios from "axios";

import { ApiErrorProps, createAxiosInstance } from "api/utils";

import { CLINICAL_TRIALS_GOV_API_KEY } from "../keys";
import { CLINICAL_TRIALS_GOV_API_URL } from "../endpoints";
import { GetStudiesByKeywords } from "../models";

/**
 * //*GET Studies by Keywords
 */
const fetchStudiesByKeywords = async (keywords: string) => {
  return axios
    .get<GetStudiesByKeywords.ApiResponse>(
      CLINICAL_TRIALS_GOV_API_URL(keywords)
    )
    .catch((error) => {
      const { errors } = error.response?.data as ApiErrorProps;
      errors?.length > 0
        ? toast.error(errors[0].detail)
        : toast.error(error.response.statusText);
      throw error;
    });
};

export const useFetchStudiesByKeywords = (
  keywords: string,
  enabled: boolean = false
) => {
  return useQuery(
    [CLINICAL_TRIALS_GOV_API_KEY, keywords],
    () => fetchStudiesByKeywords(keywords),
    {
      enabled,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );
};

import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { ApiErrorProps, createAxiosInstance } from "api/utils";

import { SEARCH_MEDICAL_KEYWORDS_API_KEY } from "../keys";
import { SEARCH_MEDICAL_KEYWORDS_API_ENDPOINT } from "../endpoints";
import { GetSearchMedicalKeywords } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Search Medical Keywords
 */
const fetchSearchMedicalKeywords = async (q: string) => {
  return AxiosInstance.get<GetSearchMedicalKeywords.ApiResponse>(
    SEARCH_MEDICAL_KEYWORDS_API_ENDPOINT(q)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchSearchMedicalKeywords = (q: string, enabled = false) => {
  return useQuery(
    [SEARCH_MEDICAL_KEYWORDS_API_KEY, q],
    () => fetchSearchMedicalKeywords(q),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled,
    }
  );
};

import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { ApiErrorProps, createAxiosInstance } from "api/utils";

import { CLINICAL_TRIALS_GOV_API_KEY } from "../keys";
import { CLINICAL_TRIALS_GOV_API_URL } from "../endpoints";
import { GetTrialsByKeywords } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Clinical Trials by Keywords
 */
const fetchTrialsByKeywords = async (keywords: string) => {
  return AxiosInstance.get<GetTrialsByKeywords.ApiResponse>(
    CLINICAL_TRIALS_GOV_API_URL(keywords)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchTrialsByKeywords = (
  keywords: string,
  enabled: boolean = false
) => {
  return useQuery(
    [CLINICAL_TRIALS_GOV_API_KEY, keywords],
    () => fetchTrialsByKeywords(keywords),
    {
      enabled,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );
};

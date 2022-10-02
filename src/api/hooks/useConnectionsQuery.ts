import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { ApiErrorProps, createAxiosInstance } from "api/utils";

import { CONNECTIONS_API_KEY } from "../keys";
import { CONNECTIONS_API_ENDPOINT } from "../endpoints";
import { GetConnections } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Connections
 */
const fetchConnections = async () => {
  return AxiosInstance.get<GetConnections.ApiResponse>(
    CONNECTIONS_API_ENDPOINT
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchConnections = () => {
  return useQuery([CONNECTIONS_API_KEY], fetchConnections, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { createAxiosInstance } from "api/utils/createAxiosInstance";

import { ME_API_KEY } from "../keys";
import { ME_API_ENDPOINT } from "../endpoints";
import { GetMe } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Me
 */
const fetchMe = async () => {
  return AxiosInstance.get<GetMe.ApiResponse>(ME_API_ENDPOINT).catch(
    (error) => {
      toast.error(error.response.statusText);
      throw error;
    }
  );
};

export const useFetchMe = () => {
  return useQuery([ME_API_KEY], fetchMe, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

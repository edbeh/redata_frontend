import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { ME_API_KEY } from "../keys";
import { ME_API_ENDPOINT } from "../endpoints";
import { GetMe } from "../models";

/**
 * //*GET Me
 */
const fetchMe = async () => {
  return axios.get<GetMe.ApiResponse>(ME_API_ENDPOINT).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchMe = () => {
  return useQuery([ME_API_KEY], fetchMe);
};

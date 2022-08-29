import axios from "axios";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { IRegisterFormFields } from "pages/Auth/Register/RegisterForm/RegisterForm.model";

import { USERS_API_KEY } from "../keys";
import { USERS_API_ENDPOINT } from "../endpoints";
import { PostUser } from "../models";

/**
 *  //*GET Users
 */
const fetchAllUsers = async () => {
  return axios.get(USERS_API_ENDPOINT).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchAllUsers = () => {
  return useQuery([USERS_API_KEY], fetchAllUsers);
};

/**
 *  //*POST Users
 */
const submitUser = async (data: IRegisterFormFields) => {
  return axios
    .post<PostUser.ApiResponse>(USERS_API_ENDPOINT, data)
    .catch((error) => {
      toast.error(error.response.statusText);
      throw error;
    });
};

export const useSubmitUser = () => {
  return useMutation(submitUser);
};

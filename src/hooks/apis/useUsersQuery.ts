import axios from "axios";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { USERS_API_KEY, USERS_API_ENDPOINT } from "const";
import { IRegisterFormFields } from "pages/Auth/Register/RegisterForm/RegisterForm.model";
import { ApiSubmitUserModel } from "models/api/ApiSubmitUserModel";

const fetchAllUsers = async () => {
  return axios.get(USERS_API_ENDPOINT).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchAllUsers = () => {
  return useQuery([USERS_API_KEY, fetchAllUsers]);
};

const submitUser = async (data: IRegisterFormFields) => {
  return axios
    .post<ApiSubmitUserModel.ApiResponse>(USERS_API_ENDPOINT, data)
    .catch((error) => {
      toast.error(error.response.statusText);
      throw error;
    });
};

export const useSubmitUser = () => {
  return useMutation(submitUser);
};

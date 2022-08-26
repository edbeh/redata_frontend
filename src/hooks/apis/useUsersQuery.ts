import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import { USERS_API_KEY, USERS_API_ENDPOINT } from "const";
import { IRegisterFormFields } from "pages/Auth/Register/RegisterForm/RegisterForm.model";

const submitUser = async (data: IRegisterFormFields) => {
  return axios.post(USERS_API_ENDPOINT, data).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitUser = () => {
  return useMutation(submitUser);
};

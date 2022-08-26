import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, UseMutationOptions } from "react-query";

import { SESSIONS_API_ENDPOINT } from "const";
import { ApiErrorProps } from "utils";
import { ApiSubmitSessionModel } from "models";
import { ILoginFormFields } from "pages/Auth/Login/LoginForm/LoginForm.model";

const submitSession = async (data: ILoginFormFields) => {
  return axios
    .post<ApiSubmitSessionModel.ApiResponse>(SESSIONS_API_ENDPOINT, data)
    .catch((error) => {
      const { errors } = error.response?.data as ApiErrorProps;
      if (errors?.length > 0) {
        toast.error(errors[0].detail);
      } else {
        toast.error(error.response.statusText);
      }
      throw error;
    });
};

export const useSubmitSession = () => {
  return useMutation(submitSession);
};

import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import { ILoginFormFields } from "pages/Auth/Login/LoginForm/LoginForm.model";

import { SESSIONS_API_ENDPOINT } from "../endpoints";
import { ApiErrorProps } from "../utils";
import { PostSession } from "../models";

/**
 *  //*POST Session
 */
const submitSession = async (data: ILoginFormFields) => {
  return axios
    .post<PostSession.ApiResponse>(SESSIONS_API_ENDPOINT, data)
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

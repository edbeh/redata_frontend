import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

import { SESSIONS_API_ENDPOINT } from "const";
import { ILoginFormFields } from "pages/Auth/Login/LoginForm/LoginForm.model";

const submitSession = (data: ILoginFormFields) => {
  return axios
    .post(SESSIONS_API_ENDPOINT, data)
    .catch((error) => toast.error(error.response.statusText));
};

export const useSubmitSession = () => {
  return useMutation(submitSession);
};

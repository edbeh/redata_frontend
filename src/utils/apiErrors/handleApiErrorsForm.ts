// standardized way to handle api response for react hook form fields
import { AxiosError } from "axios";

import { ApiErrorProps } from "./isApiError";

export const handleApiErrorsForm = (
  apiError: AxiosError<ApiErrorProps>,
  formSetError: any
) => {
  const errors = apiError?.response?.data?.errors;
  if (!errors || errors?.length === 0 || !formSetError) return;

  errors.map((error) => {
    return formSetError(error.field, {
      type: "custom",
      message: error.detail,
    });
  });
};

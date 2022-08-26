import { AxiosError } from "axios";

export interface ApiErrorObjectProps {
  status: string;
  field: string;
  detail: string;
}

export interface ApiErrorProps {
  errors: ApiErrorObjectProps[];
}

export const isApiError = (
  error: unknown
): error is AxiosError<ApiErrorProps> => {
  return error instanceof AxiosError;
};

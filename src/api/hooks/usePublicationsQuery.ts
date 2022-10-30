import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { createAxiosInstance, ApiErrorProps } from "api/utils";

import { PUBLICATIONS_API_KEY, PUBLICATIONS_EXPORT_PDF_API_KEY } from "../keys";
import {
  PUBLICATIONS_API_ENDPOINT,
  PUBLICATIONS_EXPORT_PDF_API_ENDPOINT,
} from "../endpoints";
import {
  PostPublicationsFromPubMed,
  DeletePublications,
  GetPublications,
} from "../models";
import { PostPublicationsExportPdf } from "api/models/Publications/PostPublicationsExportPdf";

const AxiosInstance = createAxiosInstance();

/**
 *  //*GET Publications
 */
const fetchAllPublications = async () => {
  return AxiosInstance.get<GetPublications.ApiResponse>(
    PUBLICATIONS_API_ENDPOINT
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchAllPublications = () => {
  return useQuery([PUBLICATIONS_API_KEY], fetchAllPublications);
};

/**
 *  //*POST Publications
 */
const submitPublicationsFromPubMed = async (
  data: PostPublicationsFromPubMed.PayLoad
) => {
  return AxiosInstance.post<PostPublicationsFromPubMed.ApiResponse>(
    PUBLICATIONS_API_ENDPOINT,
    data
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitPublicationsFromPubMed = (onSuccess: () => void) => {
  return useMutation(submitPublicationsFromPubMed, {
    onSuccess,
  });
};

/**
 *  //*POST Publications Export PDF
 */
const submitPublicationsExportPdf = async (
  data: PostPublicationsExportPdf.PayLoad
) => {
  return AxiosInstance.post<PostPublicationsExportPdf.ApiResponse>(
    PUBLICATIONS_EXPORT_PDF_API_ENDPOINT,
    data
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitPublicationsExportPdf = (onSuccess?: () => void) => {
  return useMutation(
    [PUBLICATIONS_EXPORT_PDF_API_KEY],
    submitPublicationsExportPdf,
    {
      onSuccess,
    }
  );
};

/**
 *  //*DELETE Publications
 */
const removePublications = async (data: DeletePublications.PayLoad) => {
  return AxiosInstance.delete<DeletePublications.ApiResponse>(
    PUBLICATIONS_API_ENDPOINT,
    { data }
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useRemovePublications = (onSuccess: () => void) => {
  return useMutation(removePublications, {
    onSuccess,
  });
};

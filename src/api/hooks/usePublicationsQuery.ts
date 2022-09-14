import { toast } from "react-toastify";
import { useQuery, useMutation } from "react-query";

import { createAxiosInstance } from "api/utils/createAxiosInstance";

import { PUBLICATIONS_API_KEY } from "../keys";
import { PUBLICATIONS_API_ENDPOINT } from "../endpoints";
import {
  PostPublicationsFromPubMed,
  DeletePublications,
  GetPublications,
} from "../models";

const AxiosInstance = createAxiosInstance();

/**
 *  //*GET Publications
 */
const fetchAllPublications = async () => {
  return AxiosInstance.get<GetPublications.ApiResponse>(
    PUBLICATIONS_API_ENDPOINT
  ).catch((error) => {
    toast.error(error.response.statusText);
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
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitPublicationsFromPubMed = (onSuccess: () => void) => {
  return useMutation(submitPublicationsFromPubMed, {
    onSuccess,
  });
};

/**
 *  //*DELETE Publications
 */
const removePublications = async (data: DeletePublications.PayLoad) => {
  return AxiosInstance.delete<DeletePublications.ApiResponse>(
    PUBLICATIONS_API_ENDPOINT,
    { data }
  ).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useRemovePublications = (onSuccess: () => void) => {
  return useMutation(removePublications, {
    onSuccess,
  });
};

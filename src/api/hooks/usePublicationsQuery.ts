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

const QueryClient = createAxiosInstance();

/**
 *  //*GET Publications
 */
const fetchAllPublications = async () => {
  return QueryClient.get<GetPublications.ApiResponse>(
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
  return QueryClient.post<PostPublicationsFromPubMed.ApiResponse>(
    PUBLICATIONS_API_ENDPOINT,
    data
  ).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useSubmitPublicationsFromPubMed = () => {
  return useMutation(submitPublicationsFromPubMed);
};

/**
 *  //*DELETE Publications
 */
const removePublications = async (data: DeletePublications.PayLoad) => {
  return QueryClient.delete<DeletePublications.ApiResponse>(
    PUBLICATIONS_API_ENDPOINT,
    { data }
  ).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useRemovePublications = () => {
  return useMutation(removePublications);
};

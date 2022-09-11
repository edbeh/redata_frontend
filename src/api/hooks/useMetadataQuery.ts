import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { createAxiosInstance } from "api/utils/createAxiosInstance";

import {
  METADATA_DESIGNATIONS_API_KEY,
  METADATA_INSTITUTIONS_API_KEY,
} from "../keys";
import {
  METADATA_DESIGNATIONS_API_ENDPOINT,
  METADATA_INSTITUTIONS_API_ENDPOINT,
} from "../endpoints";
import { GetMetadataDesignations, GetMetadataInstitutions } from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Designations
 */
const fetchMetadataDesignations = async () => {
  return AxiosInstance.get<GetMetadataDesignations.ApiResponse>(
    METADATA_DESIGNATIONS_API_ENDPOINT
  ).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchMetadataDesignations = () => {
  return useQuery([METADATA_DESIGNATIONS_API_KEY], fetchMetadataDesignations, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 *  //*GET Institutions
 */
const fetchMetadataInstitutions = async () => {
  return AxiosInstance.get<GetMetadataInstitutions.ApiResponse>(
    METADATA_INSTITUTIONS_API_ENDPOINT
  ).catch((error) => {
    toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchMetadataInstitutions = () => {
  return useQuery([METADATA_INSTITUTIONS_API_KEY], fetchMetadataInstitutions, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

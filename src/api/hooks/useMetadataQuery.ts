import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import {
  METADATA_DESIGNATIONS_API_KEY,
  METADATA_INSTITUTIONS_API_KEY,
} from "../keys";
import {
  METADATA_DESIGNATIONS_API_ENDPOINT,
  METADATA_INSTITUTIONS_API_ENDPOINT,
} from "../endpoints";
import { GetMetadataDesignations, GetMetadataInstitutions } from "../models";

/**
 * //*GET Designations
 */
const fetchMetadataDesignations = async () => {
  return axios
    .get<GetMetadataDesignations.ApiResponse>(
      METADATA_DESIGNATIONS_API_ENDPOINT
    )
    .catch((error) => {
      toast.error(error.response.statusText);
      throw error;
    });
};

export const useFetchMetadataDesignations = () => {
  return useQuery([METADATA_DESIGNATIONS_API_KEY, fetchMetadataDesignations]);
};

/**
 *  //*GET Institutions
 */
const fetchMetadataInstitutions = async () => {
  return axios
    .get<GetMetadataInstitutions.ApiResponse>(
      METADATA_INSTITUTIONS_API_ENDPOINT
    )
    .catch((error) => {
      toast.error(error.response.statusText);
      throw error;
    });
};

export const useFetchMetadataInstitutions = () => {
  return useQuery([METADATA_INSTITUTIONS_API_KEY, fetchMetadataInstitutions]);
};

import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { createAxiosInstance, ApiErrorProps } from "api/utils";

import {
  METADATA_DESIGNATIONS_API_KEY,
  METADATA_INSTITUTIONS_API_KEY,
  METADATA_SPECIALTIES_API_KEY,
  METADATA_RESEARCH_INTERESTS_API_KEY,
  METADATA_PATIENT_POOLS_API_KEY,
} from "../keys";
import {
  METADATA_DESIGNATIONS_API_ENDPOINT,
  METADATA_INSTITUTIONS_API_ENDPOINT,
  METADATA_SPECIALTIES_BY_DEPT_API_ENDPOINT,
  METADATA_RESEARCH_INTERESTS_BY_DEPT_API_ENDPOINT,
  METADATA_PATIENT_POOLS_BY_DEPT_API_ENDPOINT,
} from "../endpoints";
import {
  GetMetadataDesignations,
  GetMetadataInstitutions,
  GetMetadataSpecialties,
  GetMetadataResearchInterests,
  GetMetadataPatientPools,
} from "../models";

const AxiosInstance = createAxiosInstance();

/**
 * //*GET Designations
 */
const fetchMetadataDesignations = async () => {
  return AxiosInstance.get<GetMetadataDesignations.ApiResponse>(
    METADATA_DESIGNATIONS_API_ENDPOINT
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
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
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchMetadataInstitutions = () => {
  return useQuery([METADATA_INSTITUTIONS_API_KEY], fetchMetadataInstitutions, {
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 *  //*GET Specialties
 */
const fetchMetadataSpecialtiesByDeptId = async (departmentId: string) => {
  return AxiosInstance.get<GetMetadataSpecialties.ApiResponse>(
    METADATA_SPECIALTIES_BY_DEPT_API_ENDPOINT(departmentId)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchMetadataSpecialtiesByDeptId = (
  departmentId: string,
  enabled: boolean = false
) => {
  return useQuery(
    [`${METADATA_SPECIALTIES_API_KEY}_${departmentId}`],
    () => fetchMetadataSpecialtiesByDeptId(departmentId),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      enabled,
    }
  );
};

/**
 *  //*GET Research Interests
 */
const fetchMetadataResearchInterestsByDeptId = async (departmentId: string) => {
  return AxiosInstance.get<GetMetadataResearchInterests.ApiResponse>(
    METADATA_RESEARCH_INTERESTS_BY_DEPT_API_ENDPOINT(departmentId)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchMetadataResearchInterestsByDeptId = (
  departmentId: string,
  enabled: boolean = false
) => {
  return useQuery(
    [`${METADATA_RESEARCH_INTERESTS_API_KEY}_${departmentId}`],
    () => fetchMetadataResearchInterestsByDeptId(departmentId),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      enabled,
    }
  );
};

/**
 *  //*GET Patient Pools
 */
const fetchMetadataPatientPoolsByDeptId = async (departmentId: string) => {
  return AxiosInstance.get<GetMetadataPatientPools.ApiResponse>(
    METADATA_PATIENT_POOLS_BY_DEPT_API_ENDPOINT(departmentId)
  ).catch((error) => {
    const { errors } = error.response?.data as ApiErrorProps;
    errors?.length > 0
      ? toast.error(errors[0].detail)
      : toast.error(error.response.statusText);
    throw error;
  });
};

export const useFetchMetadataPatientPoolsByDeptId = (
  departmentId: string,
  enabled: boolean = false
) => {
  return useQuery(
    [`${METADATA_PATIENT_POOLS_API_KEY}_${departmentId}`],
    () => fetchMetadataPatientPoolsByDeptId(departmentId),
    {
      staleTime: 1000 * 60 * 10, // 10 minutes
      enabled,
    }
  );
};

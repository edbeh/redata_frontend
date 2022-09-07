import axios from "axios";
import { useQuery } from "react-query";

import { PUBMED_NAMES_API_KEY } from "../keys";
import {
  BASE_PUBMED_API_URL,
  SEARCH_PUBMED_IDS_PREFIX,
  SEARCH_PUBMED_IDS_SUFFIX,
  SEARCH_PUBMED_NAMES_PREFIX,
  SEARCH_PUBMED_NAMES_SUFFIX,
} from "../endpoints";
import { GetPubMedByIds, GetPubMedByNames } from "../models";

/**
 * //*GET PubMed by Names
 */
const fetchPubMedByNames = async (pubMedNames: string) => {
  const endpoints = pubMedNames?.split(",").map((name) => {
    const updatedName = name.replace(" ", "%20").trim().concat("[author]");
    return `${BASE_PUBMED_API_URL}${SEARCH_PUBMED_NAMES_PREFIX}${updatedName}${SEARCH_PUBMED_NAMES_SUFFIX}`;
  });

  return Promise.all<GetPubMedByNames.ApiResponse>(
    endpoints.map((endpoint) => axios.get(endpoint))
  )
    .then((responses) => {
      const ids: string[] = [];
      const namesToBold: string[] = [];

      responses?.map((response) => {
        const translation = response?.data?.esearchresult?.querytranslation
          ?.toLowerCase()
          ?.includes("[full author name]")
          ? response?.data?.esearchresult?.querytranslation
              ?.toLowerCase()
              ?.split("[full author name]")[0]
          : response?.data?.esearchresult?.querytranslation
              ?.toLowerCase()
              ?.split("[author]")[0];
        const splitTranslation = translation.split(", ");
        const pubmedName =
          splitTranslation?.length > 1
            ? `${splitTranslation[0]} ${splitTranslation[1][0]}`
            : `${splitTranslation[0]}`;

        namesToBold.push(pubmedName);
        return ids.push(...response?.data?.esearchresult?.idlist);
      });

      return { ids, namesToBold };
    })
    .catch((error) => {
      // toast.error(error.response.statusText);
      throw error;
    });
};

export const useFetchPubMedByNames = (
  pubMedNames: string,
  enabled: boolean = false
) => {
  return useQuery(
    [PUBMED_NAMES_API_KEY, pubMedNames],
    () => fetchPubMedByNames(pubMedNames),
    {
      enabled,
      staleTime: 1000 * 60 * 5, // 5 minutes
      keepPreviousData: true,
    }
  );
};

/**
 * //*GET PubMed by Ids
 */
const fetchPubMedByIds = async (pubMedIdsStr: string) => {
  return axios
    .get(
      `${BASE_PUBMED_API_URL}${SEARCH_PUBMED_IDS_PREFIX}${pubMedIdsStr}${SEARCH_PUBMED_IDS_SUFFIX}`
    )
    .then((response) => {
      const results = response?.data?.result;
      const publications: GetPubMedByIds.Publication[] = [];
      Object.keys(results).forEach((key: string, _index) => {
        if (key === "uids") return;
        const result: GetPubMedByIds.Publication = results[key];
        publications.push(result);
      });
      return publications.reverse() as GetPubMedByIds.Publication[];
    })
    .catch((error) => {
      // toast.error(error.response.statusText);
      throw error;
    });
};

export const useFetchPubMedByIds = (
  pubMedIds: string[],
  enabled: boolean = false
) => {
  const pubMedIdsStr = pubMedIds.join(",");

  return useQuery(
    [PUBMED_NAMES_API_KEY, pubMedIdsStr],
    () => fetchPubMedByIds(pubMedIdsStr),
    {
      enabled,
      staleTime: 1000 * 60 * 5, // 5 minutes
      keepPreviousData: true,
    }
  );
};

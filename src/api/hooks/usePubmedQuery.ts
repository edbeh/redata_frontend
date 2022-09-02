import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

import { DEPARTMENTS_API_KEY, PUBMED_NAMES_API_KEY } from "../keys";
import {
  BASE_PUBMED_API_URL,
  SEARCH_PUBMED_IDS_PREFIX,
  SEARCH_PUBMED_IDS_SUFFIX,
  SEARCH_PUBMED_NAMES_PREFIX,
  SEARCH_PUBMED_NAMES_SUFFIX,
} from "../endpoints";
import { GetPubmedByIds, GetPubmedByNames } from "../models";

/**
 * //*GET Pubmed by Names
 */
const fetchPubMedByNames = async (pubmedNames: string) => {
  const endpoints = pubmedNames?.split(",").map((name) => {
    const updatedName = name.replace(" ", "%20").trim();
    return `${BASE_PUBMED_API_URL}${SEARCH_PUBMED_NAMES_PREFIX}${updatedName}${SEARCH_PUBMED_NAMES_SUFFIX}`;
  });

  return Promise.all<GetPubmedByNames.ApiResponse>(
    endpoints.map((endpoint) => axios.get(endpoint))
  )
    .then((responses) => {
      const ids: string[] = [];
      responses?.map((response) => {
        return ids.push(...response?.data?.esearchresult?.idlist);
      });
      return ids;
    })
    .catch((error) => {
      toast.error(error.response.statusText);
      throw error;
    });
};

export const useFetchPubMedByNames = (
  pubmedNames: string,
  enabled: boolean = false
) => {
  return useQuery(
    [PUBMED_NAMES_API_KEY, pubmedNames],
    () => fetchPubMedByNames(pubmedNames),
    {
      enabled,
    }
  );
};

/**
 * //*GET Pubmed by Ids
 */
const fetchPubMedByIds = async (pubmedIdsStr: string) => {
  return axios
    .get(
      `${BASE_PUBMED_API_URL}${SEARCH_PUBMED_IDS_PREFIX}${pubmedIdsStr}${SEARCH_PUBMED_IDS_SUFFIX}`
    )
    .then((response) => {
      const results = response?.data?.result;
      const publications: GetPubmedByIds.Publication[] = [];
      Object.keys(results).forEach((key: string, _index) => {
        if (key === "uids") return;
        const result: GetPubmedByIds.Publication = results[key];
        publications.push(result);
      });
      return publications.reverse() as GetPubmedByIds.Publication[];
    })
    .catch((error) => {
      toast.error(error.response.statusText);
      throw error;
    });
};

export const useFetchPubMedByIds = (
  pubMedIds: string[],
  enabled: boolean = false
) => {
  const pubmedIdsStr = pubMedIds.join(",");

  return useQuery(
    [PUBMED_NAMES_API_KEY, pubmedIdsStr],
    () => fetchPubMedByIds(pubmedIdsStr),
    {
      enabled,
    }
  );
};

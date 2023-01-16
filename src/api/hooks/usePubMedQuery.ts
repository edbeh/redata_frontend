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
  const endpoints = pubMedNames?.split(", ").map((name) => {
    const updatedName = name.replace(" ", "%20").trim().concat("[author]");
    return `${BASE_PUBMED_API_URL}${SEARCH_PUBMED_NAMES_PREFIX}${updatedName}${SEARCH_PUBMED_NAMES_SUFFIX}`;
  });

  return Promise.all<GetPubMedByNames.ApiResponse>(
    endpoints.map((endpoint) => axios.get(endpoint))
  )
    .then((responses) => {
      const ids: string[] = [];
      const namesToBold: string[] = [];
      const invalidPubMedNames: string[] = [];

      responses?.map((response) => {
        if (response?.data?.esearchresult?.count === "0") {
          const fullInvalidName =
            response?.data?.esearchresult?.querytranslation
              ?.toLowerCase()
              ?.split("[author]")[0];

          let finalInvalidName = fullInvalidName;
          if (fullInvalidName.includes("[all fields]")) {
            const invalidLastName =
              fullInvalidName.split(" ")[fullInvalidName.split(" ").length - 1];

            finalInvalidName = `${fullInvalidName
              .split("[all fields]")[0]
              .replace(/[(]|["]/gi, "")} ${invalidLastName}`;
          }

          return invalidPubMedNames.push(
            ...invalidPubMedNames,
            finalInvalidName
          );
        }

        const translation = response?.data?.esearchresult?.querytranslation
          ?.toLowerCase()
          ?.includes("[full author name]")
          ? response?.data?.esearchresult?.querytranslation
              ?.toLowerCase()
              ?.split("[full author name]")[0]
          : response?.data?.esearchresult?.querytranslation
              ?.toLowerCase()
              ?.split("[author]")[0];
        const splitTranslation = translation?.split(",");
        const pubmedName =
          splitTranslation?.length > 1
            ? `${splitTranslation[0]
                .trimStart()
                .replace(/[(]|["]/gi, "")} ${splitTranslation[1]
                .trimStart()
                .replace(/[(]|["]/gi, "")}`
            : `${splitTranslation[0].trimStart().replace(/[(]|["]/gi, "")}`;

        namesToBold.push(pubmedName);
        return ids.push(...response?.data?.esearchresult?.idlist);
      });

      return { ids, namesToBold, invalidPubMedNames };
    })
    .catch((error) => {
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

/**
 * *App Urls
 */
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const USERS_API_ENDPOINT = `/users`;

export const SESSIONS_API_ENDPOINT = `/session`;

export const ME_API_ENDPOINT = `/me`;

export const DEPARTMENTS_API_ENDPOINT = `/departments`;

export const METADATA_DESIGNATIONS_API_ENDPOINT = `/designations/metadata`;
export const METADATA_INSTITUTIONS_API_ENDPOINT = `/institutions/metadata`;

export const PUBLIC_ENDPOINTS = [
  SESSIONS_API_ENDPOINT,
  METADATA_INSTITUTIONS_API_ENDPOINT,
];

/**
 * *External Urls
 */
export const BASE_PUBMED_API_URL =
  "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

export const SEARCH_PUBMED_NAMES_PREFIX = "/esearch.fcgi?db=pubMed&term=";
export const SEARCH_PUBMED_NAMES_SUFFIX =
  "%28singapore+general+hospital%5BAffiliation%5D%29&retmax=5000&format=json";

export const SEARCH_PUBMED_IDS_PREFIX = "/esummary.fcgi?db=pubMed&id=";
export const SEARCH_PUBMED_IDS_SUFFIX = "&sort=pubdate&retmax=5000&format=json";

/**
 * *App Urls
 */
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

// *Admins
export const ADMIN_SESSION_API_ENDPOINT = `/admin/session/`;
export const ADMIN_LIST_USERS_ENDPOINT = `/admin/users/`;
export const ADMIN_USER_BY_ID_API_ENDPOINT = (userId: string) =>
  `/admin/users/${userId}/`;
export const ADMIN_LIST_PENDING_USERS_ENDPOINT = `/admin/users/pending/`;

// *Users
export const USERS_API_ENDPOINT = `/users/`;
export const USERS_BY_ID_API_ENDPOINT = (userId: string) => `/users/${userId}/`;
export const USERS_PUBLICATIONS_BY_ID_API_ENDPOINT = (userId: string) =>
  `/users/${userId}/publications/`;
export const USERS_ACKNOWLEDGE_API_ENDPOINT = `/users/acknowledge`;

// *Sessions
export const SESSIONS_API_ENDPOINT = `/session/`;

// *Me
export const ME_API_ENDPOINT = `/me/`;

// *Connections
export const CONNECTIONS_API_ENDPOINT = `/me/connections/`;

// *Departments
export const DEPARTMENTS_API_ENDPOINT = (institutionId: string) =>
  `/departments?institution_id=${institutionId}`;

// *Publications
export const PUBLICATIONS_API_ENDPOINT = `/publications/`;
export const PUBLICATIONS_EXPORT_PDF_API_ENDPOINT = `/publications/export_pdf/`;

// *Studies
export const STUDIES_API_ENDPOINT = `/studies`;

// *Search
export const SEARCH_USERS_API_ENDPOINT = (q: string) => `/search/users?q=${q}`;
export const SEARCH_MEDICAL_KEYWORDS_API_ENDPOINT = (q: string) =>
  `/search/medical_keywords?q=${q}`;
export const SEARCH_PUBLICATIONS_API_ENDPOINT = (q: string) =>
  `/search/publications?q=${q}`;

// *Metadata
export const METADATA_DESIGNATIONS_API_ENDPOINT = `/designations/metadata/`;
export const METADATA_INSTITUTIONS_API_ENDPOINT = `/institutions/metadata/`;
export const METADATA_SPECIALTIES_BY_DEPT_API_ENDPOINT = (
  departmentId: string
) => `/specialties/metadata?department_id=${departmentId}`;
export const METADATA_RESEARCH_INTERESTS_BY_DEPT_API_ENDPOINT = (
  departmentId: string
) => `/research_interests/metadata?department_id=${departmentId}`;
export const METADATA_PATIENT_POOLS_BY_DEPT_API_ENDPOINT = (
  departmentId: string
) => `/patient_pools/metadata?department_id=${departmentId}`;

// *Public
export const PUBLIC_ENDPOINTS = [
  SESSIONS_API_ENDPOINT,
  METADATA_INSTITUTIONS_API_ENDPOINT,
];

/**
 * *External Urls
 */
// *PUBMED
export const BASE_PUBMED_API_URL =
  "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
export const SEARCH_PUBMED_NAMES_PREFIX = "/esearch.fcgi?db=pubMed&term=";
export const SEARCH_PUBMED_NAMES_SUFFIX =
  "%28singapore%5BAffiliation%5D%29&retmax=1000&format=json";
export const SEARCH_PUBMED_IDS_PREFIX = "/esummary.fcgi?db=pubMed&id=";
export const SEARCH_PUBMED_IDS_SUFFIX = "&sort=pubdate&retmax=1000&format=json";

// *CLINICALTRIALS.GOV
const getStudyFields = [
  "NCTId",
  "OfficialTitle",
  "OverallStatus",
  "OrgStudyId",
  "StudyType",
  "ResponsiblePartyType",
  "LeadSponsorName",
  "ReferencePMID",
  "ReferenceCitation",
  "LocationCountry",
  "LocationFacility",
  "ReferenceType"
];

export const CLINICAL_TRIALS_GOV_API_URL = (keywords: string) =>
  `https://classic.clinicaltrials.gov/api/query/study_fields/?max_rnk=50&expr=${keywords}+AND+SEARCH%5BLocation%5D+Singapore%0D%0A&fmt=json&fields=${getStudyFields.join(
    ","
  )}`;

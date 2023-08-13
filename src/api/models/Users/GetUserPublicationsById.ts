export declare module GetUserPublicationsById {
  export interface Datum {
    id: string;
    type: string;
    title: string;
    source: string;
    pubType: string[];
    authors: string[];
    sortFirstAuthor: string;
    elocationId: string;
    publishedAt: Date;
    volume: string;
    issue: string;
    pages: string;
    apiSource: string;
    externalId: string;
    pmcId: null | string;
    nctId: null | string;
  }

  export interface ApiResponse {
    data: Datum[];
  }
}

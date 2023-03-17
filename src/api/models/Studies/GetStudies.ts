export declare module GetStudies {
  export interface Datum {
    id: string;
    type: string;
    nctId: string;
    title: string;
    protocolId: string;
    studyType: string;
    initiatedBy: string;
    sponsorName: string;
    pmid: string;
  }

  export interface ApiResponse {
    data: Datum[];
  }
}

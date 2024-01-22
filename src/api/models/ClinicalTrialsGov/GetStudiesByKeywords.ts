export declare module GetStudiesByKeywords {
  type OverallStatus =
    | "Active, not recruiting"
    | "Recruiting"
    | "Terminated"
    | "Completed"
    | "Withdrawn"
    | "Unknown Status";

  export interface StudyField {
    Rank: number;
    NCTId: string[];
    OfficialTitle: string[];
    OverallStatus: OverallStatus[];
    OrgStudyId: string[];
    StudyType: string[];
    ResponsiblePartyType: string[];
    LeadSponsorName: string[];
    ReferencePMID: string[];
    ReferenceCitation: string[];
    LocationCountry: string[];
    LocationFacility: string[];
    ReferenceType: string[];
  }

  export interface StudyFieldsResponse {
    APIVrs: string;
    DataVrs: string;
    Expression: string;
    NStudiesAvail: number;
    NStudiesFound: number;
    MinRank: number;
    MaxRank: number;
    NStudiesReturned: number;
    FieldList: string[];
    StudyFields: StudyField[];
  }

  export interface ApiResponse {
    StudyFieldsResponse: StudyFieldsResponse;
  }
}

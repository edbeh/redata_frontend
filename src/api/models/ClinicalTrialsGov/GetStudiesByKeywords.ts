export declare module GetStudiesByKeywords {
  export interface StudyField {
    Rank: number;
    NCTId: string[];
    OfficialTitle: string[];
    OverallStatus: string[];
    OrgStudyId: string[];
    StudyType: string[];
    ResponsiblePartyType: string[];
    LeadSponsorName: string[];
    ReferencePMID: string[];
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

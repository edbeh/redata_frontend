export type OverallStatus = "Not yet recruiting" | "Recruiting";

export type StudyType = "Interventional" | "Observational";

export type ResponsiblePartyType = "Sponsor" | "Investigator-Initiated";

export interface SingleResearch {
  nctId: string;
  officialTitle: string;
  overallStatus: OverallStatus;
  orgStudyId: string;
  studyType: StudyType;
  responsiblePartyType: ResponsiblePartyType;
  leadSponsorName: string;
}

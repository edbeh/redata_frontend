export module GetPendingUsersByAdmin {
  export interface ApiResponse {
    data: Data[];
  }

  export interface Data {
    id: string;
    type: string;
    name?: string;
    email: string;
    invitedAt: string;
    researchInterests: ResearchInterest[];
    patientPools: ResearchInterest[];
  }

  export interface ResearchInterest {
    id: string;
    type: string;
    name: string;
    variant: string;
  }
}

export module GetPendingUsersByAdmin {
  export interface ApiResponse {
    data: Data[];
  }

  export interface Data {
    id: string;
    type: string;
    name?: any;
    role: string;
    email: string;
    invitedAt: string;
    institution: Institution;
    designation?: any;
    departments: Institution[];
    researchInterests: any[];
    patientPools: any[];
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}

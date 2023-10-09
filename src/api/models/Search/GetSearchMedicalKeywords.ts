export declare module GetSearchMedicalKeywords {
  export interface ApiResponse {
    data: Data[];
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    image: string;
    institution: Institution;
    designation: Institution;
    departments: Institution[];
    specialties: string[];
    researchInterests: string[];
    patientPools: string[];
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}

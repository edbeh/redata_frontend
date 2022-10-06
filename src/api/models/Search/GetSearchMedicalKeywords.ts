export declare module GetSearchMedicalKeywords {
  export interface Designation {
    id: string;
    type: string;
    name: string;
  }

  export interface Department {
    id: string;
    type: string;
    name: string;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }

  export interface Datum {
    id: string;
    type: string;
    name: string;
    designation: Designation;
    department: Department;
    institution: Institution;
    specialties: string[];
    researchInterests: string[];
    patientPools: string[];
  }

  export interface ApiResponse {
    data: Datum[];
  }
}

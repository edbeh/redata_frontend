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
    userDepartments: UserDepartment[];
    specialties: string[];
    researchInterests: string[];
    patientPools: string[];
  }

  export interface UserDepartment {
    id: string;
    type: string;
    designation: Institution;
    department: Institution;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}

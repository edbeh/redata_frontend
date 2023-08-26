export declare module GetUsersByAdmin {
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
    department: Institution;
    primarySpecialty: PrimarySpecialty;
    otherSpecialties: PrimarySpecialty[];
    researchInterests: PrimarySpecialty[];
    patientPools: PrimarySpecialty[];
  }

  export interface PrimarySpecialty {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}

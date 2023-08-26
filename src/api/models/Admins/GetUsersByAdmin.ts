export declare module GetUsersByAdmin {
  export interface ApiResponse {
    data: Datum[];
  }

  export interface Datum {
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

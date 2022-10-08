export declare module GetUserById {
  export interface Institution {
    id: string;
    type: string;
    name: string;
  }

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

  export interface PrimarySpecialty {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface OtherSpecialty {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface ResearchInterests {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface PatientPools {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    email: string;
    bio: string;
    correctedPubmedNames: string[];
    institution: Institution;
    designation: Designation;
    department: Department;
    primarySpecialty: PrimarySpecialty;
    otherSpecialties: OtherSpecialty[];
    researchInterests: ResearchInterests[];
    patientPools: PatientPools[];
    mcrNumber?: any;
    pubmedNames: string[];
    image: string | null;
  }

  export interface ApiResponse {
    data: Data;
  }
}

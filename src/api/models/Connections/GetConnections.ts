export declare module GetConnections {
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

  export interface ResearchInterest {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface PatientPool {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface Datum {
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
    researchInterests: ResearchInterest[];
    patientPools: PatientPool[];
  }

  export interface ApiResponse {
    data: Datum[];
  }
}

export declare module GetMe {
  export interface ApiResponse {
    data: Data;
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    role: string;
    acknowledgedAt: string;
    image: string;
    institution: Institution;
    designation: Institution;
    departments: Institution[];
    primarySpecialty: PrimarySpecialty;
    otherSpecialties: PrimarySpecialty[];
    researchInterests: PrimarySpecialty[];
    patientPools: PrimarySpecialty[];
    email: string;
    bio?: any;
    correctedPubmedNames: string[];
    googleScholar: GoogleScholar;
    mcrNumber: string;
    pubmedNames: string[];
  }

  export interface GoogleScholar {
    id: string;
    type: string;
    url: string;
    name: string;
    table: Table[];
    graph: Graph[];
  }

  export interface Graph {
    year: string;
    citations: string;
  }

  export interface Table {
    citations?: Citations;
    "h-index"?: Citations;
    "i10-index"?: Citations;
  }

  export interface Citations {
    all: string;
    since_2018: string;
  }

  export interface PrimarySpecialty {
    id: string;
    type: string;
    name: string;
    variant: string;
  }

  export interface UserDepartment {
    id: string;
    type: string;
    designation?: Institution;
    department: Institution;
  }

  export interface Institution {
    id: string;
    type: string;
    name: string;
  }
}

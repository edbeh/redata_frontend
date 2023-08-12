export declare module PostAdminSession {
  export interface PayLoad {
    email: string;
    password: string;
  }

  export interface Data {
    id: string;
    type: string;
    name: string;
    image: string;
    institution: Institution;
    designation: Designation;
    department: Department;
    primarySpecialty: PrimarySpecialty;
    otherSpecialties: OtherSpecialty[];
    researchInterests: ResearchInterest[];
    patientPools: PatientPool[];
    email: string;
    bio: string;
    correctedPubmedNames: string[];
    googleScholar: GoogleScholar;
  }

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

  export interface GoogleScholar {
    id: string;
    type: string;
    url: string;
    name: string;
    table: Table[];
    graph: Graph[];
  }

  export interface Table {
    citations?: Citations;
    "h-index"?: HIndex;
    "i10-index"?: I10Index;
  }

  export interface Citations {
    all: string;
    since_2018: string;
  }

  export interface HIndex {
    all: string;
    since_2018: string;
  }

  export interface I10Index {
    all: string;
    since_2018: string;
  }

  export interface Graph {
    year: string;
    citations: string;
  }

  export interface ApiResponse {
    jwt: string;
    data: Data;
  }
}
